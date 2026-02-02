import { Op, type WhereOptions } from 'sequelize';

import type { ExpenseCreateInput, Expense } from '@/types/bank-user.type';
import type { ExpenseCreatedPayload } from '@common/src';

import { ExpenseModel } from '@/db/models/expense.model';

const
