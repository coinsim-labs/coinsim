import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import {LeaderboardRoutingModule} from "./leaderboard-routing.module";

@NgModule({
  imports: [
    LeaderboardRoutingModule,
    CommonModule
  ],
  declarations: [LeaderboardComponent]
})
export class LeaderboardModule { }
