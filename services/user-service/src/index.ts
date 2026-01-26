import { createApp } from "@/app";
import { createServer } from "http";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { intializeDatabse } from "@/db";
import { startAuthEventConsumer } from "@/messaging/auth-consumer";
import { initTransactions } from "@/messaging/event-messaging";


const main = async() => {
        try{
                await intializeDatabse()
                await initTransactions()
                await startAuthEventConsumer()


                const app = createApp();
                const server = createServer(app);

                const port = env.USER_SERVICE_PORT;

                server.listen(port, () => {
                        logger.info({ port }, 'User service is runnnig')
                });

                const shutdown = () => {
                        logger.info('Shutting down user service...');
                        Promise.all([])
                        .catch((error: unknown) => {
                                logger.error({ err: error }, 'Error during shutdown tasks');
                        })
                        .finally(() => {
                                server.close(() => process.exit(0));
                        });
                };

                process.on('SIGINT', shutdown);
                process.on('SIGTERM', shutdown);
        }catch(error){
                logger.error({ err: error }, 'Failed to start user service');
                process.exit(1)
        }
}

void main()