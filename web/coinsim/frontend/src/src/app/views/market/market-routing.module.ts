import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MarketComponent } from './market.component';

const routes: Routes = [
  {
    path: '',
    component: MarketComponent,
    data: {
      title: 'Market'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketRoutingModule {}