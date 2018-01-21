import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { CommonModule } from '@angular/common';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { AppCryptoDayChartComponent } from './../../components';
import { AppPiechartComponent } from './../../components';
import { BalanceHistoryComponent } from './balance-history/balance-history.component';
import { WalletCompositionComponent } from './wallet-composition/wallet-composition.component';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
    WalletRoutingModule,
//    ChartsModule
    ChartModule,
    CommonModule 
  ],
  declarations: [ WalletComponent,  AppPiechartComponent, BalanceHistoryComponent, WalletCompositionComponent ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
  ]
})
export class WalletModule { }
