import { NgModule, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { MarketRoutingModule } from './market-routing.module';
import { MarketComponent} from "./market.component";
import { PriceSparklinesComponent} from "./price-sparklines/price-sparklines.component";
import { DetailComponent } from '../market-detail/detail.component';
import { AppCryptoDayChartModule } from '../../components/app-cryptodaychart/app-cryptodaychart.module';
import {ValuesPipe} from "./ValuesPipe";

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
    MarketRoutingModule,
    ChartModule,
    CommonModule,
    AppCryptoDayChartModule
  ],
  declarations: [
    DetailComponent, PriceSparklinesComponent, MarketComponent, ValuesPipe
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }
  ]
})

export class MarketModule {}
