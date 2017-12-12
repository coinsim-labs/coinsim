import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  private marketModel;

  constructor(private http: Http) {
    this.http.get("../../../assets/tmp/market.json")
      .subscribe((success) => {
        let x = success.json().DISPLAY;
        this.marketModel = Object.keys(x).map(k => {
           x[k].NAME = k;
           return x[k];
        });
        console.log(success.json());
      });
  }

  ngOnInit() {

  }

}
