import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { ChartModule } from 'angular-highcharts';

import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryTableComponent } from './history-table/history-table.component';
// import { AppLinechartComponent } from './../../components';

@NgModule({
  imports: [
    HistoryRoutingModule,
//    ChartsModule
  ],
  declarations: [ HistoryComponent, HistoryTableComponent ]
})
export class HistoryModule { }
