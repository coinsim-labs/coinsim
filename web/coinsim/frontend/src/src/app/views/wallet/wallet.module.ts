import { NgModule } from '@angular/core';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartModule } from 'angular-highcharts';

import { WalletComponent } from './wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';
import { AppLinechartComponent } from './../../components';
import { AppPiechartComponent } from './../../components';

@NgModule({
  imports: [
    WalletRoutingModule,
//    ChartsModule
    ChartModule
  ],
  declarations: [ WalletComponent, AppLinechartComponent, AppPiechartComponent ]
})
export class WalletModule { }
