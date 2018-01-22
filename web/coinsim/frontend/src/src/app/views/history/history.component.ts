import { Component, OnInit } from '@angular/core';
import { CoinsimService } from '../../coinsim.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [CoinsimService]
})
export class HistoryComponent implements OnInit {

  constructor(private cs: CoinsimService) { }

  ngOnInit() {
    this.cs.refresh();
  }

}
