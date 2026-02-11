/**
 * Monobank API Expense Object
 * Represents a transaction/expense from the monobank API
 */
export interface Expense {
  /** User identifier */
  userId: string;
  /** Unique transaction identifier */
  id: string;
  /** Transaction timestamp */
  time: Date;
  /** Transaction description (merchant name, etc.) */
  description: string;
  /** Merchant Category Code */
  mcc: number;
  /** Transaction amount in minor units (kopiykas) */
  amount: number;
  /** Currency code (ISO 4217) */
  currencyCode: number;
  /** Commission rate applied to the transaction */
  commissionRate: number;
  /** Cashback amount earned from the transaction */
  cashback: number;
  /** Account balance after the transaction */
  balance: number;
  /** Record creation timestamp */
  createdAt: Date;
  /** Record last update timestamp */
  updatedAt: Date;
}

/**
 * Input type for creating a new expense record
 */
export interface ExpenseCreateInput {
  /** User identifier */
  userId: string;
  /** Transaction timestamp */
  time: Date;
  /** Transaction description */
  description: string;
  /** Merchant Category Code */
  mcc: number;
  /** Transaction amount in minor units */
  amount: number;
  /** Currency code (ISO 4217) */
  currencyCode: number;
  /** Commission rate */
  commissionRate: number;
  /** Cashback amount */
  cashback: number;
  /** Account balance */
  balance: number;
}

/**
 * Extended expense with additional metadata for reporting
 */
export interface ExpenseReport extends Expense {
  /** Transaction type: 'debit' | 'credit' */
  type: 'debit' | 'credit';
  /** Human-readable amount in main currency units */
  amountFormatted: number;
  /** Original amount if currency conversion was applied */
  originalAmount?: number;
  /** Original currency if currency conversion was applied */
  originalCurrency?: number;
}

/**
 * Expense category based on MCC codes
 */
export interface ExpenseCategory {
  /** Category ID */
  id: number;
  /** Category name */
  name: string;
  /** MCC codes included in this category */
  mccCodes: number[];
}
