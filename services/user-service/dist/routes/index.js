import { userRoutes } from "@/routes/user.routes";
export const registerRoutes = (app) => {
    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok', service: 'user-service' });
    });
    app.use('/users', userRoutes);
};
//# sourceMappingURL=index.js.map