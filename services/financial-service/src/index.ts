import { createApp } from "@/app";
import { createServer } from "http";
import { env } from "@/config/env";
import { logger } from "@/utils/logger";
import { initializeDatabase } from "@/db";


const main = async() => {
        try{
                await initializeDatabase()


                const app = createApp();
                const server = createServer(app);

                const port = env.FINANCE_SERVICE_PORT

                server.listen(port, () => {
                        logger.info({ port }, 'Finance service is runnnig')
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
                logger.error({ err: error }, 'Failed to start finance service');
                process.exit(1)
        }
}

void main()