import { AsyncHandler } from '@common/src';
import { financialProxyService } from '@/services/financial-proxy.service';
import { 
  createSingleExpenseSchema,
  createMultipleExpensesSchema,
  searchExpenseByIdSchema,
  searchForPeriod,
  getAllUserExpensesSchema,
  expenseIdParamsSchema
} from '@/validation/financial.schema';


export const createSingleExpense: AsyncHandler = async (req, res, next) => {
  try {
    const payload = createSingleExpenseSchema.parse(req.body);
    const response = await financialProxyService.createSingleExpense({
      userId: payload.userId,
      id: '',
      time: payload.time instanceof Date ? payload.time.toISOString() : String(payload.time),
      description: payload.description,
      mcc: payload.mcc,
      amount: payload.amount,
      currencyCode: payload.currencyCode,
      commissionRate: payload.commissionrate,
      cashback: payload.cashback,
      balance: payload.balance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const createMultipleExpenses: AsyncHandler = async (req, res, next) => {
  try {
    const parsed = createMultipleExpensesSchema.parse(req.body);
    const expenses = parsed.expenses.map(expense => ({
      userId: expense.userId,
      id: '',
      time: expense.time instanceof Date ? expense.time.toISOString() : String(expense.time),
      description: expense.description,
      mcc: expense.mcc,
      amount: expense.amount,
      currencyCode: expense.currencyCode,
      commissionRate: expense.commissionrate,
      cashback: expense.cashback,
      balance: expense.balance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    const response = await financialProxyService.createMultipleExpenses(expenses);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const findExpenseById: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = expenseIdParamsSchema.parse(req.params);
    const response = await financialProxyService.findExpenseById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const findExpensesForUser: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const response = await financialProxyService.findExpensesForUser(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const findExpensesForFixedPeriod: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const payload = searchForPeriod.parse(req.body);
    const response = await financialProxyService.findExpensesForFixedPeriod(id, {
      userId: payload.userId,
      from: payload.from instanceof Date ? payload.from.toISOString() : String(payload.from),
      to: payload.to ? (payload.to instanceof Date ? payload.to.toISOString() : String(payload.to)) : undefined
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const findExpensesForFlexiblePeriod: AsyncHandler = async (req, res, next) => {
  try {
    const { id } = req.params as { id: string };
    const { userId, from } = searchForPeriod.parse(req.body);
    const response = await financialProxyService.findExpensesForFlexiblePeriod(id, {
      userId,
      from: from instanceof Date ? from.toISOString() : String(from)
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

