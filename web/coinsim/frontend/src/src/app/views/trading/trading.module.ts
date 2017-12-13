import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { TradingComponent } from './trading.component';
import { TradingRoutingModule } from './trading-routing.module';

@NgModule({
  imports: [
    TradingRoutingModule,
//    ChartsModule
    ChartModule
  ],
  declarations: [ TradingComponent ]
})
export class TradingModule { }
