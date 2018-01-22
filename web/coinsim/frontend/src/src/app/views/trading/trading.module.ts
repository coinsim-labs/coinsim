import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

import { TradingComponent } from './trading.component';
import { TradingRoutingModule } from './trading-routing.module';
import { MatSliderModule } from '@angular/material/slider';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
//import 'hammerjs';

@NgModule({
  imports: [
    TradingRoutingModule,
    CommonModule,
    ChartModule,
    FormsModule,
    MatSliderModule,
    //BrowserAnimationsModule,
    //NoopAnimationsModule
  ],
  declarations: [ 
    TradingComponent,
   ]
})
export class TradingModule { }
