import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { BalanceHistory } from './balancehistory';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { colors } from '../../../cryptocolors';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-balance-history',
  template: '<div id="{{id}}" [chart]="chart" class="balance-history"></div>',
  styleUrls: ['./balance-history.component.scss']
})
export class BalanceHistoryComponent implements OnInit {

  chart: Chart;
  cryptoColors: any;

  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) {
    this.cryptoColors = colors;
  }

  buildChart(series, transactions) {
    let that = this;
    this.chart = new Chart({
      chart: {
        type: 'area',
        marginRight: 70
      },
      title: {
        text: 'Wallet history'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Value in USD'
        }
      },
      tooltip: {
        positioner: function (labelWidth, labelHeight, point) {
            return { x: this.chart.plotLeft + point.plotX - labelWidth/2, y: this.chart.plotTop - 50 };
        },
        formatter: function() {
          const currencyName = this.point.series.name;
          let datePipe = new DatePipe('en-US');
          let decimalPipe = new DecimalPipe('en-US');

          // let transaction = that.getCorrespondingTransaction(currencyName, this.x, transactions);
          // if (transaction !== false) {
          let balance = this.point.balance;
          // if(transaction.source_currency === currencyName) {
          //   balance = transaction.new_balance_source;
          // } else {
          //   balance = transaction.new_balance_dest;
          // }

          let index = this.series.xData.indexOf(this.x);
          let prevBalance = 0;
          if(index > 0) {
            prevBalance = this.series.data[index-1].balance;
          }

          let balanceChange = '';
          if(this.point.balance > prevBalance) {
            balanceChange = 'Change: <span style="color: #4dbd74; word-spacing: -2px">+'
              + decimalPipe.transform(this.point.balance - prevBalance, '1.0-8')
              + ' ' + currencyName + '</span><br/>';
          } else if(this.point.balance < prevBalance) {
            balanceChange = 'Change: <span style="color: #DF5A49; word-spacing: -2px">'
              + decimalPipe.transform(this.point.balance - prevBalance, '1.0-8')
              + ' ' + currencyName + '</span><br/>';
          }
          // else {
          //   balanceChange += 'Change: <span class="balance-unchanged">+0.00</span>';
          // }

          // if(balanceChange !== '') {
          //   return '<span style="font-size: smaller">' + datePipe.transform(this.x, 'longDate') + '</span>'
          //     + '<br/>'
          //     + balanceChange
          //     + '<br/>'
          //     + 'Balance: <strong class="currency">' + balance + currencyName + '</strong>'
          //     + '<br/>'
          //     + 'Valued at: <strong>' + currencyPipe.transform(this.y, '$') + '</strong>'
          //     + '<br/>'
          //     + 'Total:' + currencyPipe.transform(this.total, '$');
          // }

          return '<span style="font-size: smaller">'+ datePipe.transform(this.x, 'longDate')+ '</span><br/>'
            + balanceChange
            + 'Balance: <span style="word-spacing: -2px">' + decimalPipe.transform(balance, '1.0-8') + ' ' + currencyName + '</span><br/>'
            + 'Valued at: <span style="word-spacing: -2px; font-weight: bold">' + decimalPipe.transform(this.y, '1.0-2') + ' $' + '</span><br/>'
            + 'Total: <span style="word-spacing: -2px">' + decimalPipe.transform(this.total, '1.0-2') + ' $' +'</span><br/>';
        },
        crosshairs: [{
            width: 1,
            color: 'lightgrey',
            zIndex: 3
        }, { width: 0 }],
        shadow: false,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(255,255,255,0.9)',
        split: false,
        shape: "callout"
      },
      plotOptions: {
        area: {
          stacking: 'normal'
        },
        series: {
          marker: {
            enabled: false,
            states:{
               select:{
                   enabled: false,
               }
             }
          }
        }
      },
      series: series
    });
  }

  //        css: "border-radius: 5px;"
//        split: true,
//        valueSuffix: '$'
//            marker: {
//                lineWidth: 1,
//                lineColor: '#666666'
 //           }

  getCorrespondingTransaction(currencyName, x, transactions) {
    for (const timestamp in transactions[currencyName]) {
      if (parseInt(timestamp,10) === x) {
        return transactions[currencyName][timestamp];
      }
    }
    return false;
  }

  hasCorrespondingTransaction(currencyName, x, transactions) {
    return this.getCorrespondingTransaction(currencyName, x, transactions) !== false;
  }

  getMarker(currencyName, x, transactions) {

    if(this.hasCorrespondingTransaction(currencyName, x, transactions)) {
      return {
          enabled: true,
           states:{
             hover:{
               enabled: true,
               lineWidthPlus: 1
             },
             select:{
                 enabled: true,
             }
           }
        }
    }
    return {
        enabled: false,
         states:{
           hover:{
               enabled: false,
           },
           select:{
               enabled: false,
           }
         },
         symbol: null
      }
  }

  transactionPriceObservable(currency, currencies): Observable<BalanceHistory[]> {
    return Observable.create((observer) => {
      const timestamps = Object.keys(currencies[currency]).sort();
      const firstTimestamp = timestamps[0];
      if (currencies[currency].hasOwnProperty(firstTimestamp)) {
        const timeDiff = Math.ceil(((new Date()).getTime() - parseInt(firstTimestamp, 10)) / 1000 / 60 / 60 / 24);
        this.cryptoService.histo('day', 'USD', currency,
                                         null, null, null, null, null, timeDiff)
        .subscribe((priceResult) => {
          observer.next({currency: currency, balances: currencies[currency], prices: priceResult.Data});
        });
      }
    }).first();
  }

  getCurrentBalances() {
    return this.coinsimService.balances().switchMap(balancesResult => {
      const currencies = balancesResult.map(balance => balance.currency);
      return this.cryptoService.singleCryptoPrice('USD', currencies.join(',')).map(prices => {
        balancesResult.map(balance => {
          balance.inUSD = balance.amount / prices[balance.currency];
          return balance;
        });
        return balancesResult;
      });
    });
  }


  ngOnInit() {
    this.coinsimService.transactions().subscribe((transactionResult) => {
      const tasks = [];
      let currencies = [];
      let transactions = [];
      let minDate = Infinity;
      transactionResult.forEach((transaction) => {
        // Assume that transaction results are ordered by timeStamp (TODO is this correct?)
        const dateKey = new Date(transaction.timestamp);
        // Overwrite all balances from the same day with the last one
        dateKey.setMilliseconds(0);
        dateKey.setSeconds(0);
        dateKey.setMinutes(0);
        dateKey.setHours(0);

        minDate = Math.min(dateKey.getTime(), minDate);

        if (typeof currencies[transaction.source_currency] === 'undefined') {
          currencies[transaction.source_currency] = [];
          transactions[transaction.source_currency] = [];
        }
        currencies[transaction.source_currency][dateKey.getTime()] = transaction.new_balance_source;
        transactions[transaction.source_currency][dateKey.getTime()] = transaction;

        if (typeof currencies[transaction.dest_currency] === 'undefined') {
          currencies[transaction.dest_currency] = [];
          transactions[transaction.dest_currency] = [];
        }

        currencies[transaction.dest_currency][dateKey.getTime()] = transaction.new_balance_dest;
        transactions[transaction.dest_currency][dateKey.getTime()] = transaction;

      });
      //For some reason this seems to be the only way to copy currencies without reference
      // for (const currency in currencies) {
      //   if (currencies.hasOwnProperty(currency)) {
      //     transactions[currency] = [];
      //     const timestamps = Object.keys(currencies[currency]).sort();
      //     for (const timestamp of timestamps) {
      //       if (currencies[currency].hasOwnProperty(timestamp)) {
      //         transactions[currency][timestamp] = currencies[currency][timestamp];
      //       }
      //     }
      //   }
      // }

      // All values Include today's transactions by
      let today = new Date();
      today.setMilliseconds(0);
      today.setSeconds(0);
      today.setMinutes(0);
      today.setHours(0);
      // Add historical balances by adding the last known balance for each currency to days without transaction
      while (minDate < today.getTime()) {
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
        transactionPriceResults.forEach((res: BalanceHistory) => {
          const currency = res.currency;
          const priceResult = res.prices;
          const balances = res.balances;

          // TODO timeStamps of prices and balances don't match perfectly
          // so right now we just assume that timeStamp of price[i] ~= timeStamp of balance[i]
          // Should create a better solution.
          const timestamps = Object.keys(balances).sort();
          for (let i = 0; i < timestamps.length; i++) {
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

            //const dateKey = [date.getDate(), date.getMonth(), date.getFullYear()].join('-');
            const usdBalance = balance / price;

            results[currency][date.getTime()] = [date.getTime(), usdBalance, balance];
          };
        });

        let now = new Date();
        this.getCurrentBalances().subscribe(balances => {
          balances.forEach(balance => {
            results[balance.currency][now.getTime()] = [now.getTime(), balance.inUSD, balance.amount];
          });

          for (const key in results) {
            if (results.hasOwnProperty(key)) {
              const data = [];
              for (const dateKey in results[key]) {
                if (results[key].hasOwnProperty(dateKey)) {
                  const seriesEntry = {x:0, y:0, marker: {}, balance: 0};
                  seriesEntry.x = results[key][dateKey][0];
                  seriesEntry.y = results[key][dateKey][1];
                  seriesEntry.balance = results[key][dateKey][2];
                  seriesEntry.marker = this.getMarker(key, seriesEntry.x, transactions);
                  data.push(seriesEntry); //results[key][dateKey]
                }
              }
              const lineData = {
                name: key,
                data: data,
                color: this.cryptoColors[key]
              };
              series.push(lineData);
            }
          }
          this.buildChart(series, transactions);
        });
      });
    });
  }

}
