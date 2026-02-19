import { AsyncHandler } from '@common/src';
import { bankProxyService } from '@/services/bank-proxy.service';
import { 
  createBakUserSchema, 
  bankUserIdParamsSchema,
  createCardSchema,
  cardIdParamsSchema
} from '@/validation/bank.schema';


export const createBankUser: AsyncHandler = async (req, res, next) => {
  try {
    const payload = createBakUserSchema.parse(req.body);
    const response = await bankProxyService.createBankUser({
      bankName: payload.displayName,
      apiKey: payload.apiKey,
      clientId: payload.clientId || ''
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllBankUsers: AsyncHandler = async (_req, res, next) => {
  try {
    const response = await bankProxyService.getAllBankUsers();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getBankUser: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = bankUserIdParamsSchema.parse(req.params);
    const response = await bankProxyService.getBankUserById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createCard: AsyncHandler = async (req, res, next) => {
  try {
    const payload = createCardSchema.parse(req.body);
    const response = await bankProxyService.createCard({
      identifier: payload.identifier,
      currencyCode: payload.currencyCode,
      balance: payload.balance
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getCard: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = cardIdParamsSchema.parse(req.params);
    const response = await bankProxyService.getCardById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const createMultipleCards: AsyncHandler = async (req, res, next) => {
  try {
    const payload = req.body as Array<{ identifier: string; currencyCode: number; balance: number }>;
    if (!payload || !Array.isArray(payload) || payload.length === 0) {
      throw new Error('Invalid payload: expected non-empty array');
    }
    const response = await bankProxyService.createMultipleCards({
      identifier: payload[0].identifier,
      currencyCode: payload[0].currencyCode,
      balance: payload[0].balance
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

