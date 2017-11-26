import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sparklineCharts } from './dashboard.graphs';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sparklineCharts = sparklineCharts;

  constructor( ) { }

}
