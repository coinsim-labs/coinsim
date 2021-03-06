import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { LeaderboardComponent } from './leaderboard.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardComponent,
    data: {
      title: 'Leaderboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LeaderboardRoutingModule{}
