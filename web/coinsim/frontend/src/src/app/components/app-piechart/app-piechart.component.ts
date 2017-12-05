import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-piechart',
  templateUrl: './app-piechart.component.html'
})
export class AppPiechartComponent implements OnInit {
  chart: Chart;

  constructor() {
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
    series: [{
        name: 'Percantage',
        data: [{
            name: 'US Dollar',
            y: 56.33
        }, {
            name: 'ETH',
            y: 24.03,
            sliced: true,
            selected: true
        }, {
            name: 'BTC',
            y: 10.38
        }, {
            name: 'LTC',
            y: 4.77
        }, {
            name: 'MONA',
            y: 0.91
        }, {
            name: 'XLM',
            y: 0.2
        }]
    }]
  });
   }

  ngOnInit() {
  }

}