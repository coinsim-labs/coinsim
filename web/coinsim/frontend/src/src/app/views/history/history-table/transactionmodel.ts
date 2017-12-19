export class Transactionmodel {

  constructor(public timestamp: Date,
              public soldCurrency: string,
              public boughtCurrency: string,
              public soldAmount: number,
              public boughtAmount: number) {}
  
  public getExchangeRate(): number {
    return this.boughtAmount / this.soldAmount;
  }
}
