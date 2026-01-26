import { USER_CREATED_ROUTING_KEY, USER_EVENTS_EXCHANGE } from "@common/src"; /// Exchange keys for RABBITMQ
import amqplib from 'amqplib';


import type { UserCreatedEvent, UserCreatedPayload } from "@common/src"; /// bound/unboud events for
import type { Channel, ChannelModel, Connection } from "amqplib";


import { env } from "@/config/env";
import { logger } from "@/utils/logger";


type ManagedConnection = Connection & Pick<ChannelModel, 'close' | 'createChannel'>;

let connection: ManagedConnection | null = null;
let channel: Channel | null = null

const messagingEnabled = Boolean(env.RABBITMQ_URL);

const ensureChannel = async (): Promise<Channel | null> => {
        if(!messagingEnabled){
                return null
        }

        if(channel){
                return channel
        }

        if(!env.RABBITMQ_URL){
                return null
        }

        const amqpConnection = (await amqplib.connect(env.RABBITMQ_URL)) as unknown as ManagedConnection;
        connection = amqpConnection;
        amqpConnection.on('close', () => {
                logger.warn('RabbitMQ connection closed🔒.');
                connection = null;
                channel = null;
        });
        amqpConnection.on('error', (error) => {
                logger.error({ err: error }, 'RabbitMQ connection error❌.')
        });


        const amqpChannel = await amqpConnection.createChannel();
        channel = amqpChannel
        await amqpChannel.assertExchange(USER_EVENTS_EXCHANGE, 'topic', { durable: true });

        return amqpChannel;
}


export const initTransactions = async () => {
        if(!messagingEnabled){
                logger.info('RabbitMQ URL is not configured ➡️ Messaging is disabled.')
                return;
        }

        await ensureChannel();
        logger.info('User service RabbitMQ publisher initialized✅.');
};


export const closeTransactions = async () => {
        try{
                if(channel){
                        const currentChannel: Channel = channel;
                        channel = null;
                        await currentChannel.close();
                }

                if(connection){
                        const currentConnection: ManagedConnection = connection;
                        connection = null;
                        await currentConnection.close();
                }

                logger.info('User service RabbitMQ publisher closed.')
        }catch(error){
                logger.error({ err: error }, 'Error closing RabbitMQ connection / channel');
        }
};



export const publishUserCreatedEvent = async (payload: UserCreatedPayload) => {
        const ch = await ensureChannel();

        if(!ch){
                logger.debug({ payload }, 'Skipping [ user.created ] event')
                return;
        }

        const event: UserCreatedEvent = {
                type: USER_CREATED_ROUTING_KEY,
                payload,
                occurredAt: new Date().toISOString(),
                metadata: { version: 1 }
        };


        try{
                const sucess = ch.publish(
                        USER_EVENTS_EXCHANGE,
                        USER_CREATED_ROUTING_KEY,
                        Buffer.from(JSON.stringify(event)),
                        { contentType: 'application/json', persistent: true },
                );

                if(!sucess){
                        logger.warn({ event }, 'Failed to publish user.created event');
                }
        }catch(error){
                logger.error({ err: error }, 'Error publishing [ user.created ] event');
        }
}