import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';

import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryTableComponent } from './history-table/history-table.component';
import { ReversePipe } from './history-table/reversepipe';
import { MarketPriceComponent } from './market-price/market-price.component';
// import { AppLinechartComponent } from './../../components';

@NgModule({
  imports: [
    HistoryRoutingModule,
    CommonModule
//    ChartsModule
  ],
  declarations: [ HistoryComponent, HistoryTableComponent, ReversePipe, MarketPriceComponent ]
})
export class HistoryModule { }
