import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { TradingComponent } from './trading.component';

const routes: Routes = [
  {
    path: '',
    component: TradingComponent,
    data: {
      title: 'Trading'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TradingRoutingModule {}