import { NgModule } from '@angular/core';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
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