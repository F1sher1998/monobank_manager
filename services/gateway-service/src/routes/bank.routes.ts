import { 
        createBankUser,
        createCard, 
        createMultipleCards, 
        getAllBankUsers,
        getBankUser,
        getCard
} from "@/controllers/bank.controller";
import {
        createBakUserSchema,
        createCardSchema,
        cardIdParamsSchema,
        bankUserIdParamsSchema
} from "@/validation/bank.schema";
import { asyncHandler, validateRequest } from "@common/src";
import { requireAuth } from "@/middleware/require-auth";
import { Router } from "express";

export const bankRouter: Router = Router();

bankRouter.get('/', requireAuth, asyncHandler(getAllBankUsers));
bankRouter.get('/:id', requireAuth, validateRequest({params: bankUserIdParamsSchema}), asyncHandler(getBankUser));
bankRouter.get('/card/:id', requireAuth, validateRequest({params: cardIdParamsSchema}), asyncHandler(getCard));
bankRouter.post('/', validateRequest({body: createBakUserSchema}), asyncHandler(createBankUser));
bankRouter.post('/card', validateRequest({body: createCardSchema}), asyncHandler(createCard))
bankRouter.post('/card/many', validateRequest({body: createCardSchema}), asyncHandler(createMultipleCards))