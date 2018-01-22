import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { MarketComponent } from './market.component';
import { MarketRoutingModule } from './market-routing.module';

import { DetailComponent } from '../market-detail/detail.component';
import { AppCryptoDayChartComponent } from './../../components';
import { AppCryptoDayChartModule } from '../../components/app-cryptodaychart/app-cryptodaychart.module'

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
    MarketRoutingModule,
//    ChartsModule
    ChartModule,
    CommonModule,
    AppCryptoDayChartModule
  ],
  declarations: [ 
    //MarketComponent,
    DetailComponent,
    //AppCryptoDayChartComponent
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ]
})
export class MarketModule { }
