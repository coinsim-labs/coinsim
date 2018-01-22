import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { Component, OnInit } from '@angular/core';
import { Transactionmodel } from './transactionmodel';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss']
})
export class HistoryTableComponent implements OnInit {
  
  transactions: Observable<Transactionmodel[]>
  
  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) { }

  ngOnInit() {
    this.transactions = this.coinsimService.transactions().map(transactions => {
      const transactionModels = [];
      const lastBalances = {};
      return transactions.map(transaction => {
        if (typeof lastBalances[transaction.dest_currency] === 'undefined') {
          lastBalances[transaction.dest_currency] = 0;
        }
        const timestampDate = new Date(transaction.timestamp);
        const soldCurrency = transaction.source_currency;
        const boughtCurrency = transaction.dest_currency;
        const soldAmount = transaction.amount;
        const boughtAmount = transaction.new_balance_dest - lastBalances[transaction.dest_currency];
        lastBalances[transaction.dest_currency] = transaction.new_balance_dest;
        lastBalances[transaction.source_currency] = transaction.new_balance_source;
        return new Transactionmodel(timestampDate, soldCurrency, boughtCurrency, soldAmount, boughtAmount);
      });
    });
  }

}
