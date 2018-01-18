import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoinsimService } from './coinsim.service';
import { MarketComponent } from './views/market/market.component'

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate : [ CoinsimService ],
    data: {
      title: 'Account'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'wallet',
        loadChildren: './views/wallet/wallet.module#WalletModule'
      },
      {
        path: 'history',
        loadChildren: './views/history/history.module#HistoryModule'
      },
      {
        path: 'market',
        component: MarketComponent,
        children: [
          {
            path: '',
            loadChildren: './views/market/market.module#MarketModule'
          }
        ]
      },
      {
        path: 'trading',
        loadChildren: './views/trading/trading.module#TradingModule'
      },
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: [ 
    //MarketComponent
  ]
})
export class AppRoutingModule {}
