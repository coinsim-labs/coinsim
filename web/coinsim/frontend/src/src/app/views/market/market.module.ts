import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { MarketComponent } from './market.component';
import { MarketRoutingModule } from './market-routing.module';

import { DetailComponent } from '../market-detail/detail.component';

@NgModule({
  imports: [
    MarketRoutingModule,
//    ChartsModule
    ChartModule,
    CommonModule
  ],
  declarations: [ 
    //MarketComponent,
    DetailComponent
  ]
})
export class MarketModule { }