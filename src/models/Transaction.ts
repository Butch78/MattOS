export type BaseTransaction = {
  name: string;
  location: string;
  askingPrice: number;
  transactionOwner: string;
};

export type Transaction = BaseTransaction & {
  id: number;
  createdAt: string; // ISO date string
  userId: number;
};

export type CreateTransactionRequest = BaseTransaction;

export type UpdateTransactionRequest = Partial<BaseTransaction>;

export type CreateTransactionResponse = {
  transaction: Transaction;
};
