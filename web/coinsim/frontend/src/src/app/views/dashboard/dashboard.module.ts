import { NgModule } from '@angular/core';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppCryptoDayChartComponent } from './../../components';
import { AppCryptoDayChartModule } from '../../components/app-cryptodaychart/app-cryptodaychart.module'
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
    DashboardRoutingModule,
    AppCryptoDayChartModule,
    //ChartModule,
    CommonModule 
  ],
  declarations: [ 
    DashboardComponent, 
    //AppCryptoDayChartComponent
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ]
})
export class DashboardModule { }
