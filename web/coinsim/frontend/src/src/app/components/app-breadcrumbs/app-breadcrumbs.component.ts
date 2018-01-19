import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CoinsimService, Currency } from '../../coinsim.service';

@Component({
  selector: 'app-breadcrumbs',
  template: `
  <ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs" let-last = last>
    <li class="breadcrumb-item"
        *ngIf="breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last"
        [ngClass]="{active: last}">
      <a *ngIf="!last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</a>
      <span *ngIf="last" [routerLink]="breadcrumb.url">{{breadcrumb.label.title}}</span>
    </li>
  </ng-template>`
})
export class AppBreadcrumbsComponent {
  breadcrumbs: Array<Object>;
  currencies = {};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cs: CoinsimService
  ) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.getCurrencies();
      this.breadcrumbs = [];
      let currentRoute = this.route.root,
      url = '';

      this.cs.currencies().subscribe(currencies => {
        currencies.forEach(c => {
            this.currencies[c.sym.toLowerCase()] = c.name;
         });
        
         let curr = this.currencies;

         do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          // tslint:disable-next-line:no-shadowed-variable
          childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
  
              //console.log(this.currencies['BTC'])
              let label = {}
              if (routeSnapshot.params.currency) {
                label = {title: this.currencies[routeSnapshot.params.currency.toLowerCase()]}
              } else {
                label = route.snapshot.data
              }
              this.breadcrumbs.push({
                label: label,
                url:   url
              });
              currentRoute = route;
            }
          });
        } while (currentRoute);

         
      });


    });
  }

  getCurrencies() {
    
  }
}
