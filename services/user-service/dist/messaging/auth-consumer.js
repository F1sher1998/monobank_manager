import { AUTH_EVENT_EXCHANGE, AUTH_USER_REGISTERED_ROUTING_KEY } from "@common/src";
import { connect } from "amqplib";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { userService } from "@/services/user.service";
let connectionRef = null;
let channel = null;
let consumerTag = null;
const QUEUE_NAME = 'auth-service.auth-events';
const closeConnection = async (conn) => {
    await conn.close();
    connectionRef = null;
    channel = null;
    consumerTag = null;
};
const handleMessage = async (message, ch) => {
    const raw = message.content.toString('utf-8');
    const event = JSON.parse(raw);
    await userService.syncFromAuthUser(event.payload);
    ch.ack(message);
};
export const startAuthEventConsumer = async () => {
    if (!env.RABBITMQ_URL) {
        logger.warn('RabbitMQ URL in not configured, skip');
        return;
    }
    if (channel) {
        return;
    }
    const connection = (await connect(env.RABBITMQ_URL));
    connectionRef = connection;
    const ch = await connection.createChannel();
    channel = ch;
    await ch.assertExchange(AUTH_EVENT_EXCHANGE, 'topic', { durable: true });
    const queue = await ch.assertQueue(QUEUE_NAME, { durable: true });
    await ch.bindQueue(queue.queue, AUTH_EVENT_EXCHANGE, AUTH_USER_REGISTERED_ROUTING_KEY);
    const consumeHandler = (msg) => {
        if (!msg) {
            return;
        }
        void handleMessage(msg, ch).catch((error) => {
            logger.info({ err: error }, 'Failed to process auth event');
            ch.nack(msg, false, false);
        });
    };
    const result = await ch.consume(queue.queue, consumeHandler);
    consumerTag = result.consumerTag;
    connection.on('clsoe', () => {
        logger.warn('Auth consumer connection closed');
        connectionRef = null;
        channel = null;
        consumerTag = null;
        consumerTag = null;
    });
    connection.on('error', (error) => {
        logger.error({ err: error }, 'Auth consumer connection error');
    });
    logger.info('Auth event consumer started');
};
export const stopAuthEventConsume = async () => {
    try {
        const ch = channel;
        if (ch && consumerTag) {
            await ch.cancel(consumerTag);
            consumerTag = null;
        }
        if (ch) {
            await ch.close();
            channel = null;
        }
        const conn = connectionRef;
        if (conn) {
            await closeConnection(conn);
            connectionRef = null;
        }
    }
    catch (error) {
        logger.error({ err: error }, 'Failed to stop auth event consumer');
    }
};
//# sourceMappingURL=auth-consumer.js.map