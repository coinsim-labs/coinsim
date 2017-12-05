import { NgModule } from '@angular/core';
//import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { MarketComponent } from './market.component';
import { MarketRoutingModule } from './market-routing.module';

@NgModule({
  imports: [
    MarketRoutingModule,
//    ChartsModule
    ChartModule
  ],
  declarations: [ MarketComponent ]
})
export class MarketModule { }