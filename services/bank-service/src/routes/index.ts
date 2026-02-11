import type { Router } from "express";
import { bankUserRoutes } from "@/routes/bank.routes";

export const registerRoutes = (app: Router) => {
        app.get('/health', (_req, res) => {
                res.status(200).json({ status: 'ok', service: 'bank-service' });
        });

        app.use('/bank', bankUserRoutes)
}