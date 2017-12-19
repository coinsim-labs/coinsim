// TODO create a class with clear structure instead of class wrapping API call
export class BalanceHistory {
  currency: string;
  balances: Object; //    { TimeStamp0: balanceAmount0, TimeStamp1: balanceAmount1, ....}
  prices: Object[]; // [ {timeStamp: number, high: number, low: number, close: number, ... }, { ... } ]
}
