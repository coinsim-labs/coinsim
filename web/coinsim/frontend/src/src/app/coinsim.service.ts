import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';

export class Currency {
    name: string;
    sym: string;
    color: string;
}

@Injectable()
export class CoinsimService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    /**
     * Routerfunction to check if user logged in
     * TODO: Should be with VERIFY TOKEN
     */
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Post for registering a new account
     * If successful safe token in localstorage
     * @param username username for new account
     * @param email email for new account
     * @param password password for new account
     */
    register(username: string, email: string, password: string): Observable<boolean> {
        if (email !== '') {
            return this.http.post('/api/v1/auth/signup/', { 'username': username, 'password': password, 'email': email })
                .map((response: Response) => {
                    const token = response.json() && response.json().token;
                    if (token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token }));
                        this.router.navigate(['/dashboard']);
                        return true;
                    } else {
                        return false;
                    }
                }
            );
        } else {
            return this.http.post('/api/v1/auth/signup/', { 'username': username, 'password': password })
                .map((response: Response) => {
                    const token = response.json() && response.json().token;
                    if (token) {
                        this.token = token;
                        localStorage.setItem('currentUser', JSON.stringify({username: username, token: token }));
                        this.router.navigate(['/dashboard']);
                        return true;
                    } else {
                        return false;
                    }
                }
            );
        }
    }

    /**
     * Post for userlogin
     * if successful redirect to dashboard
     * @param username Username
     * @param password Password
     */
    login(username: string, password: string) {
        this.logout();

        return this.http.post('/api/v1/auth/login/', {'username': username, 'password': password})
            .map((response: Response) => {
                const token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.router.navigate(['/dashboard']);
                }
            }
        );
    }
  
    transactions() {
      const headers = new Headers();
      headers.append('Authorization', 'JWT ' + this.token);
      return this.http.get('/api/v1/user/transactions/', {headers: headers})
            .map((response: Response) => response.json());
    }
  
    balances() {
      const headers = new Headers();
      headers.append('Authorization', 'JWT ' + this.token);
      return this.http.get('/api/v1/user/balances/', {headers: headers})
            .map((response: Response) => response.json());
    }

    protected _currencies: Array<Currency>;

    /**
     * Observable of supported Currencies. 
     * If called initially or refresh is true, an api call is issued.
     */
    public currencies(refresh?: boolean): Observable<Array<Currency>> {
        return new Observable(observer => {
            if (this._currencies) {
              observer.next(this._currencies);
              return observer.complete();
            }
            this.http
              .get('/api/v1/trade/currencies/')
              .map((r: Response) => (r.json() as Array<Currency>))
              .subscribe((currencies: Array<Currency>) => {
                this._currencies = currencies;
                observer.next(currencies);
                observer.complete();
              });
          });
    
      }

    /**
     * Post for Logout
     */
    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
