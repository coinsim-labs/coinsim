import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { AppLinechartComponent } from './../../components';
import { AppPiechartComponent } from './../../components';
import { BalanceHistoryComponent } from './app-balance-history/balance-history.component';

@NgModule({
  imports: [
    WalletRoutingModule,
//    ChartsModule
    ChartModule
  ],
  declarations: [ WalletComponent, AppLinechartComponent, AppPiechartComponent, BalanceHistoryComponent ]
})
export class WalletModule { }
