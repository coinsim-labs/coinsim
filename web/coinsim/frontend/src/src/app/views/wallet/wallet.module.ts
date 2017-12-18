import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';
import { CommonModule } from '@angular/common';

import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { AppLinechartComponent } from './../../components';
import { AppPiechartComponent } from './../../components';
import { BalanceHistoryComponent } from './app-balance-history/balance-history.component';
import { WalletCompositionComponent } from './app-wallet-composition/wallet-composition.component';


@NgModule({
  imports: [
    WalletRoutingModule,
//    ChartsModule
    ChartModule,
    CommonModule 
  ],
  declarations: [ WalletComponent, AppLinechartComponent, AppPiechartComponent, BalanceHistoryComponent, WalletCompositionComponent ]
})
export class WalletModule { }
