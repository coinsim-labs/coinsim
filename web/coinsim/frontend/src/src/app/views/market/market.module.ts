import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { MarketComponent } from './market.component';
import { MarketRoutingModule } from './market-routing.module';

@NgModule({
  imports: [
    MarketRoutingModule,
//    ChartsModule
    ChartModule,
    CommonModule
  ],
  declarations: [ MarketComponent ]
})
export class MarketModule { }