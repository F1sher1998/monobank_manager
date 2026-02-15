import type { Router } from "express";
import { expenseRoutes } from "@/routes/expense.routes";

export const registerRoutes = (app: Router) => {
        app.get('/health', (_req, res) => {
                res.status(200).json({ status: 'ok', service: 'financial-service' });
        })

        app.use('/users', expenseRoutes)
}