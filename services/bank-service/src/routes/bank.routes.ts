import { Router } from "express";
import { createBankUserSchema } from "@/validation/bank-user.schema";
import { asyncHandler, validateRequest } from "@common/src";
import { createBankUser, getBankUser, getAllBankUsers } from "@/controllers/bank-user.controller";


export const bankUserRoutes: Router = Router();

bankUserRoutes.post('/', validateRequest({body: createBankUserSchema}), asyncHandler(createBankUser));
bankUserRoutes.get('/', asyncHandler(getAllBankUsers));
bankUserRoutes.get('/:id', asyncHandler(getBankUser));
