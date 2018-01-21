import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';

import { AppComponent } from './app.component';

import { CoinsimService } from './coinsim.service';
import { CryptoCompareService } from './cryptocompare.service';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  // AppAsideComponent,
  // AppLinechartComponent,
  AppBreadcrumbsComponent,
  // AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  // AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV,
} from './components';


const APP_COMPONENTS = [
  // AppLinechartComponent,
  // AppAsideComponent,
  AppBreadcrumbsComponent,
  // AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  // AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartModule } from 'angular-highcharts';
import { WalletComponent } from './views/wallet/wallet.component';
import { BalanceHistoryComponent } from './views/wallet/balance-history/balance-history.component';
import { WalletCompositionComponent } from './views/wallet/wallet-composition/wallet-composition.component';
import { MarketComponent } from './views/market/market.component';
import { HistoryComponent } from './views/history/history.component';
import { HistoryTableComponent } from './views/history/history-table/history-table.component';
import { TradingComponent } from './views/trading/trading.component';
import { AppCryptoDayChartComponent } from './components';


export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    MarketComponent,
    //AppCryptoDayChartComponent
  ],
  providers: [
      CoinsimService,
      {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
      }, 
      CryptoCompareService,
      { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules } 
      
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
