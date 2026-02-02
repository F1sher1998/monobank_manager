import { Router } from "express";
import { validateRequest } from "@common/src";
import { loginHandler, registerHandler, revokeHandler, refreshHandler } from "@/controllers/auth.controller";
import { loginSchema, registerSchema, revokeSchema, refreshSchema } from "./auth.schema";
export const authRouter = Router();
authRouter.post('_', validateRequest({ body: registerSchema.shape.body }), registerHandler);
authRouter.post('/login', validateRequest({ body: loginSchema.shape.body }), loginHandler);
authRouter.post('/refresh', validateRequest({ body: refreshSchema.shape.body }), refreshHandler);
authRouter.post('/revoke', validateRequest({ body: revokeSchema.shape.body }), revokeHandler);
//# sourceMappingURL=auth.routes.js.map