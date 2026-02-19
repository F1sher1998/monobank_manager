import { loginUser, registerUser, refreshTokens, revokeTokens } from "@/controllers/auth.controller";
import { loginSchema, registerSchema, revokeSchema, refreshSchema } from "@/validation/auth.schema";
import { asyncHandler, validateRequest } from "@common/src";
import { Router } from "express";

export const authRouter: Router = Router();

authRouter.post('/register', validateRequest({ body: registerSchema }), asyncHandler(registerUser));
authRouter.post('/login', validateRequest({ body: loginSchema }), asyncHandler(loginUser));
authRouter.post('/refresh', validateRequest({ body: refreshSchema }), asyncHandler(refreshTokens));
authRouter.post('/revoke', validateRequest({ body: revokeSchema }), asyncHandler(revokeTokens));