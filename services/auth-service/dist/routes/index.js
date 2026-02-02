import { authRouter } from "./auth.routes";
export const registerRoutes = (app) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'auth-service' });
    });
    app.use('/auth', authRouter);
};
//# sourceMappingURL=index.js.map