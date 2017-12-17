import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-balance-history',
  template: '<div id="{{id}}" [chart]="chart" class="balance-history"></div>',
  styleUrls: ['./balance-history.component.scss']
})
export class BalanceHistoryComponent implements OnInit {

  chart: Chart;

  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) { }

  buildChart(series) {
    this.chart = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Wallet history'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Value in USD' 
        }
      },
      tooltip: {
        split: true,
        valueSuffix: '$'
      },
      plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
      },
      series: series
    });
  }
  
  transactionPriceObservable(currency, currencies) {
    return Observable.create((observer) => {
      const timestamps = Object.keys(currencies[currency]).sort();
      const firstTimestamp = timestamps[0];
      if (currencies[currency].hasOwnProperty(firstTimestamp)) {
        const timeDiff = Math.ceil(((new Date()).getTime() - parseInt(firstTimestamp, 10)) / 1000 / 60 / 60 / 24);
        this.cryptoService.histo('day', 'USD', currency,
                                         null, null, null, null, null, timeDiff)
        .subscribe((priceResult) => {
          observer.next({currency: currency, balances: currencies[currency], price: priceResult});
        });
      }
    }).first();
  } 
  
  ngOnInit() {
    this.coinsimService.transactions().subscribe((transactionResult) => {
      const tasks = [];
      const currencies = [];
      let minDate = Infinity; 
      transactionResult.forEach((transaction) => {
        // Assume that transaction results are ordered by timeStamp (TODO is this correct?)
        const dateKey = new Date(transaction.timestamp);
        minDate = Math.min(dateKey.getTime(), minDate);
        
        // Overwrite all balances from the same day with the last one
        dateKey.setMilliseconds(0);
        dateKey.setSeconds(0);
        dateKey.setMinutes(0);
        dateKey.setHours(0);
        
        
        if (typeof currencies[transaction.source_currency] === 'undefined') {
          currencies[transaction.source_currency] = [];
        }
        currencies[transaction.source_currency][dateKey.getTime()] = transaction.new_balance_source;
        
        if (typeof currencies[transaction.dest_currency] === 'undefined') {
          currencies[transaction.dest_currency] = [];
        }

        currencies[transaction.dest_currency][dateKey.getTime()] = transaction.new_balance_dest;
      }); 
      while (minDate < (new Date()).getTime()) {
        minDate += 24 * 60 * 60 * 1000;
        for (const currency in currencies) {
         if (currencies.hasOwnProperty(currency)) {
           let minDatePrice;
           const timestamps = Object.keys(currencies[currency]).sort();
           for (const timestamp of timestamps) {
             if (currencies[currency].hasOwnProperty(timestamp)) {
               const balance = currencies[currency][timestamp];
               if (parseInt(timestamp, 10) > minDate && typeof minDatePrice === 'undefined') {
                 currencies[currency][minDate] = 0;
                 minDatePrice = 0;
               }
               if (parseInt(timestamp, 10) <= minDate) {
                 minDatePrice = balance;
               }
             }
           }
           currencies[currency][minDate] = minDatePrice;
         }
        }
      }
       for (const currency in currencies) {
         if (currencies.hasOwnProperty(currency)) {
           tasks.push(this.transactionPriceObservable(currency, currencies));    
         }
      }

      Observable.forkJoin(...tasks).subscribe((transactionPriceResults) => { 
        const series = [];
        const results = [];
        transactionPriceResults.forEach((res) => {
          const currency = res.currency;
          const priceResult = res.price.Data;
          const balances = res.balances;
           
          const timestamps = Object.keys(balances).sort();
          for (let i = 0; i < timestamps.length-1; i++) {
            const timestamp = timestamps[i];
            const balance = balances[timestamp];
            const date = new Date(parseInt(timestamp, 10));
            if (typeof results[currency] === 'undefined') {
              results[currency] = [];
            }
            
            let price;
            if (currency === 'USD') {
              price = 1;
            } else {
              price = priceResult[i]['close'];
            }
            
            const dateKey = [date.getDate(), date.getMonth(), date.getFullYear()].join('-');
            const usdBalance = balance / price;
            
            results[currency][dateKey] = [dateKey, usdBalance];
          };
        });
        for (const key in results) {
          if (results.hasOwnProperty(key)) {
            const data = [];
            for (const dateKey in results[key]) {
              if (results[key].hasOwnProperty(dateKey)) {
                data.push(results[key][dateKey]);
              }
            }
            const lineData = {
              name: key,
              data: data
            };
            series.push(lineData);
          }
        }
        this.buildChart(series);
      });
    });
  }

}
