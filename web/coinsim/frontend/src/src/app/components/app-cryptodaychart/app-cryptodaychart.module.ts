import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

import { AppCryptoDayChartComponent } from './../../components';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
//    ChartsModule
    ChartModule,
    CommonModule
  ],
  declarations: [ 
    //MarketComponent,
    AppCryptoDayChartComponent
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ],
  exports: [
    AppCryptoDayChartComponent
  ]
})

export class AppCryptoDayChartModule { }