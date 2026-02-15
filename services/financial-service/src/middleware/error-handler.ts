import { HttpError } from "@common/src";

import type { ErrorRequestHandler } from "express";
import { logger } from "@/utils/logger";


export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
        logger.info({ err }, 'Unhandled errpor occured');

        const error = err instanceof HttpError ? err : undefined;
        const statusCode = error?.statusCode ?? 500;
        const message = statusCode >= 500 ? 'Internal server error' : (error?.message ?? 'Unknown Error');
        const payload = error?.details ? { message, details: error.details } : { message };

        res.status(statusCode).json(payload)

        void _next();
}