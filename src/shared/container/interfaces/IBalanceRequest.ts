export interface IBalanceRequest {
  userId?: string;
  username?: string;
  value?: number;
  type?: "credit" | "debit";
}
