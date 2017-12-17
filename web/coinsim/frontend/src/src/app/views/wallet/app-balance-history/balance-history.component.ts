import { CoinsimService } from '../../../coinsim.service';
import { CryptoCompareService } from '../../../cryptocompare.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-balance-history',
  template: '<div id="{{id}}" [chart]="chart" class="balance-history"></div>',
  styleUrls: ['./balance-history.component.scss']
})
export class BalanceHistoryComponent implements OnInit {

  chart = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Wallet history'
      },
      xAxis: {
      },
      yAxis: {
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions'
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
      series: [{
        name: 'Line 1',
        data: [1, 2, 3]
      }]
    });

  constructor(private coinsimService: CoinsimService, private cryptoService: CryptoCompareService) { }

  ngOnInit() {
    this.coinsimService.transactions().subscribe((result) => console.log(result));
  }

}
