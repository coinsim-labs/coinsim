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
import { PriceSparklinesComponent } from './price-sparklines/price-sparklines.component';

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
    AppCryptoDayChartModule,
    PriceSparklinesComponent
  ],
  declarations: [
    //MarketComponent,
    DetailComponent, PriceSparklinesComponent,
    //AppCryptoDayChartComponent
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ]
})
export class MarketModule { }
