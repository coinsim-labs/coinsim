import { Component, OnInit, Input } from '@angular/core';
import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { Chart } from 'angular-highcharts';
import { Balance } from './balance';
import { Observable } from 'rxjs/Observable';
import { colors } from '../../../cryptocolors';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-wallet-composition',
  templateUrl: './wallet-composition.component.html',
  styleUrls: ['./wallet-composition.component.css'],
})
export class WalletCompositionComponent implements OnInit {

  @Input() currency_map: any;
  balances: Observable<Balance[]>;
  totalInUSD: Observable<number>
  chart: Chart;
  cryptoColors: any;

  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) {
    this.cryptoColors = colors;
  }

  ngOnInit() {
    this.balances = this.coinsimService.balances().switchMap(balancesResult => {
      const currencies = balancesResult.map(balance => balance.currency);
      return this.cryptoService.singleCryptoPrice('USD', currencies.join(',')).map(prices => {
        balancesResult.map(balance => {
          balance.inUSD = balance.amount / prices[balance.currency];
          return balance;
        });
        return balancesResult;
      });
    });
    this.balances.subscribe(this.buildPieChart.bind(this));
    this.balances.subscribe(this.getTotalInUSD.bind(this))
  }

  getTotalInUSD(balances) {
    this.totalInUSD = balances.reduce((a,b) => a + b.inUSD, 0);
  }

  buildPieChartSeries(balances) {
    const data = balances.map(balance => {
      return {
        name: balance.currency,
        color: this.cryptoColors[balance.currency],
        y: balance.inUSD
      };
    });

    return [{
      name: 'Percentage',
      data: data
    }]
  }

  buildPieChart(balances) {
    const series = this.buildPieChartSeries(balances);
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
          text: 'Wallet Composition'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: series
    });
  }

}
