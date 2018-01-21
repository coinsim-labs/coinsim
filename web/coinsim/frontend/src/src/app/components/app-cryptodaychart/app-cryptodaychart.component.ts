import { Component, OnInit, Input } from '@angular/core';
import { Chart, StockChart } from 'angular-highcharts';
import { CryptoCompareService } from '../../cryptocompare.service';
import { Currency } from '../../coinsim.service';
import { colors } from '../../cryptocolors';
import { CoinsimService } from '../../coinsim.service';

@Component({
  selector: 'app-cryptodaychart',
  templateUrl: './app-cryptodaychart.component.html',
  styleUrls: ['./app-cryptodaychart.component.css']
})
export class AppCryptoDayChartComponent implements OnInit {
  
    @Input() currencies: any;
    currency_map: any;

    chart: StockChart;
    cryptocolors: any;
    selected: Currency
    price_data: any;

    price_now: number;
    price_delta: number;
    price_percentage: number;

    month_range: number;

  constructor(private ccs: CryptoCompareService, private cs: CoinsimService ) {
    
    this.month_range = 3;
    this.cryptocolors = colors;

    
    this.chart = new StockChart({
      chart: {
        height: 300,
    },
    rangeSelector : {
        inputEnabled:false,
        selected: 1,
        buttons: [{
            type: 'month',
            count: 1,
            text: '1M'
        }, {
            type: 'month',
            count: 3,
            text: '3M'
        }, {
            type: 'month',
            count: 6,
            text: '6M'
        }, {
            type: 'year',
            count: 1,
            text: '1Y'
        }, {
            type: 'all',
            text: 'All'
        }]
     },
     
     navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    tooltip: {
        positioner: function (labelWidth, labelHeight, point) {
            return { x: point.plotX - labelWidth/2, y: this.chart.plotTop };
        },
        shadow: false,
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'rgba(255,255,255,0.9)',
        crosshairs: [{
            width: 1,
            color: 'lightgrey',
            zIndex: 3 
        }, false ],
        split: false,
        shape: "callout",
        css: "border-radius: 5px;"

    },
    title: {
    },
    subtitle : {},

    xAxis: {
        type: 'datetime',
        events: {
            setExtremes: this.selectRange
          }
    },
    yAxis: {
        title: {
            text: 'US Dollar'
        },
        min: 0
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            cursor: 'move',
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                  [0, '#FEEBC7'],
              ]
            },
            lineColor: '#FDAF36',
            marker: {
                radius: 2
            },
            lineWidth: 1.5,
            states: {
                hover: {
                    lineWidth: 1.5
                }
            },
            threshold: null
        },
        
    },
  
    series: [{
        type: 'area',
        colorByPoint: false,
        name: '',
        color: '#45B29D',
        data: [
          
          ]
    }]
  });
    
   }

  ngOnInit() {
    this.cs.currencyMap().subscribe((currencies) => {
        this.currency_map = currencies;
        let c = this.currencies[0]

        if (this.currencies.length == 1) {
            this.chart.options.title = {text: this.currency_map[c].name}
            this.chart.options.subtitle = {text: this.currency_map[c].sym}
        }
    
        this.select(this.currency_map[c])
    });


  }

  selectRange = (e: any) => {
    if(typeof(e.rangeSelectorButton)!== 'undefined') {
        var c = e.rangeSelectorButton.count;
        var t = e.rangeSelectorButton.type;

        if (t == 'month') {
              this.month_range = c;
        } else if (t == 'year') {
              this.month_range = 12;
        } else {
              this.month_range = null;
        }
          this.loadTicker()
        }
      
  };

  loadChart() {
    let timestamp = Date.now();
    let days_past = 2000;
    this.ccs.histoDay(this.selected.sym, 'USD', null,null,null,null,null,days_past,timestamp ).subscribe(data => {
        this.price_data = data.Data.map( obj => 
            [ parseInt(obj.time)*1000, obj.close ]
        ).filter( i =>  i[1] > 0)

        this.chart.ref.series[0].update({
            data: this.price_data,
        }, true);

        this.chart.ref.series[0].name = this.selected.name
        console.log(this.price_data)

        this.loadTicker()
    })
  }

  loadTicker() {

    this.price_now = this.price_data[
        this.price_data.length-1] [1]
    
    if (this.month_range) {
        let now = Date.now();
        let now_date = new Date(now);
        let past = now_date.setMonth(now_date.getMonth() - this.month_range)
        let days = Math.round((now-past)/(1000*60*60*24))

        let price_past = this.price_data[this.price_data.length -1 - days] [1]
        this.price_delta = this.price_now - price_past
        this.price_percentage = (this.price_delta/price_past) * 100
        console.log(this.price_percentage)
    }
  }

  select(currency: Currency) {
      this.selected = currency;
      this.loadChart();
  }

}