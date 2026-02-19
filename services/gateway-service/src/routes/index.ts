import { Router } from "express";
import { authRouter } from "@/routes/auth.routes";
import { userRouter } from "@/routes/user.routes";
import { bankRouter } from "@/routes/bank.routes";
import { financialRouter } from "@/routes/financial.routes";

export const registerRoutes =(app: Router) => {
        app.get('/health', (_req, res) => {
                res.status(200).json({status: 'ok', service: 'gateway-service'})
        });

        app.use('/auth', authRouter);
        app.use('/users', userRouter);
        app.use('/bank', bankRouter);
        app.use('/financial', financialRouter)
}