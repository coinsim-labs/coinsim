import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

import { TradingComponent } from './trading.component';
import { TradingRoutingModule } from './trading-routing.module';
import {MatSliderModule} from '@angular/material/slider';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { ModalsComponent } from './modals.component';
//import 'hammerjs';

@NgModule({
  imports: [
    TradingRoutingModule,
    CommonModule,
    ChartModule,
    IonRangeSliderModule,
    FormsModule,
    MatSliderModule,
    ModalModule.forRoot(),
    //BrowserAnimationsModule,
    //NoopAnimationsModule
  ],
  declarations: [ 
    TradingComponent,
    //ModalsComponent,
   ]
})
export class TradingModule { }
