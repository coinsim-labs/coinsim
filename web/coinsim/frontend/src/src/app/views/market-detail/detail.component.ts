import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  templateUrl: 'detail.component.html'
})
export class DetailComponent {
  currency: string;

  constructor(private route: ActivatedRoute, private titleService: Title) {
    this.route.params.subscribe(
        params => this.currency = params['currency']
    );
    
  }

}
