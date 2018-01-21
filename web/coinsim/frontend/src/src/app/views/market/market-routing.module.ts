import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MarketComponent } from './market.component';
import { DetailComponent } from '../market-detail/detail.component';

const routes: Routes = [
  {
    path: '',
    //component: MarketComponent,
    data: {
      title: 'Market'
    },
    children: [
      {
        path: ':currency',
        component: DetailComponent,
        //data: {
        //  title: ':currency'
        //}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketRoutingModule {}