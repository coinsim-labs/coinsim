import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs/Observable';
import { ExchangeOption } from './exchangeoption';
import { DeepSet } from './deepset';

@Component({
  selector: 'app-market-price',
  template: '<div class="linechart" ></div>',
  styleUrls: ['./market-price.component.scss']
})
export class MarketPriceComponent implements OnInit {
  
  chart: Chart;
  selectedOption: ExchangeOption;
  exchangeOptions: DeepSet<ExchangeOption>;
  
  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) { }

  buildChart(series) {
    this.chart = new Chart({  
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    }
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: series
    });
  }
  
  ngOnInit() {
//    [{
//    type: 'area',
//            name: 'USD to EUR',
//            data: series.data
//        }]
    this.coinsimService.transactions().subscribe((transactionResult) => {
      this.exchangeOptions = new DeepSet();
      let minDate = Infinity;
      transactionResult.forEach((transaction) => {
        const dateKey = new Date(transaction.timestamp);
        minDate = Math.min(dateKey.getTime(), minDate);
      
        this.exchangeOptions.add({sourceCurrency: transaction.source_currency, destCurrency: transaction.dest_currency});
      })
      this.selectedOption = this.exchangeOptions.values().next().value; // TODO make dynamic
      const sourceCurrency = this.selectedOption.sourceCurrency;
      const destCurrency = this.selectedOption.destCurrency;
      const dayDiff = Math.ceil(((new Date()).getTime() - minDate) / 1000 / 60 / 60 / 24);
      this.cryptoService.histoDay(sourceCurrency, destCurrency,
        null, null, null, null, null,
        dayDiff + 5
      ).subscribe((priceResults: any) => {
       const data = priceResults.Data.map(result => {
          const date = new Date(result.time + 500);
          const dateKey = [date.getDate(), date.getMonth(), date.getFullYear()].join('-');
          return [dateKey, result.close];
        });
        console.log(data);
      });
    });
  }

}
