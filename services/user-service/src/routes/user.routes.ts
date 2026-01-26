import { createUser, getUser, getAllUsers, searchUsers } from "@/controllers/user.controller";
import { createUserSchema, searchUserQuerySchema, userIdParamsSchema } from "@/validation/user.schema";
import { asyncHandler, validateRequest } from "@common/src";
import { Router } from "express";


export const userRoutes: Router = Router();


userRoutes.get('/', asyncHandler(getAllUsers));
userRoutes.get('/search', validateRequest({ query: searchUserQuerySchema }), asyncHandler(searchUsers));
userRoutes.get('/:id', validateRequest({ params: userIdParamsSchema }), asyncHandler(getUser));
userRoutes.post('/', validateRequest({ body: createUserSchema }), asyncHandler(createUser));