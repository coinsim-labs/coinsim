import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Chart} from "angular-highcharts";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-price-sparklines',
  template: '<div id="{{id}}" [chart]="chart" class="market-sparkline"></div>',
  styleUrls: ['./price-sparklines.component.scss']
})
export class PriceSparklinesComponent implements OnInit {

  @Input()
  public priceData;

  private chart: Chart;

  constructor() { }

  ngOnInit() {
    let data = this.priceData.map((entry) => {
      return [entry.time, entry.close];
    });
    let series = [{
      data: data
    }];
    this.buildChart(series);
  }

   buildChart(series) {
    this.chart = new Chart({
      chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'line',
            margin: [2, 0, 2, 0],
            height: 40,
            width: 120,
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime',
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false,
            // backgroundColor: null,
            // borderWidth: 0,
            // shadow: false,
            // useHTML: true,
            // hideDelay: 0,
            // shared: true,
            // padding: 0,
            // positioner: function (w, h, point) {
            //     return { x: point.plotX - w / 2, y: point.plotY - h };
            // }
        },
        plotOptions: {
            series: {
                animation: false,
                lineWidth: 1,
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                marker: {
                    radius: 1,
                    states: {
                        hover: {
                            radius: 2
                        }
                    }
                }
                // fillOpacity: 0.25
            },
            column: {
                negativeColor: '#910000',
                borderColor: 'silver'
            }
        },
        series: series
      });
  }

}
