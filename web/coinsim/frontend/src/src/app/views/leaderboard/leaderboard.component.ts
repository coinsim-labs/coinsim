import { Component, OnInit } from '@angular/core';
import {CoinsimService} from "../../coinsim.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  public rankings: Observable<any>;

  constructor(public coinsimService: CoinsimService) {
  }

  ngOnInit() {
    this.rankings = this.coinsimService.rankings();
  }
}
