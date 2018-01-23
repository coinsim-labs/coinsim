import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/reduce'
//import { map, reduce } from 'rxjs/operators';

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
     * Get Header Header with JWT Token
     */
    getHeaders() {
        const headers = new Headers();
        headers.append('Authorization', 'JWT ' + this.token);
        return headers;
    }

    
    /**
     * Routerfunction to check if user logged in
     */
    canActivate(): any {
        const token = this.token;
        return this.http.post('/api/v1/auth/token-verify/', {'token' : token})
        .map((response: Response) => {
            if (response.json().token) {
                return true;
            } else {
                return false;
            }
        }).catch((error: Response) => {
            this.router.navigate(['pages/login']);
            return Observable.throw(new Error(error.json()));
        })
        
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
                        localStorage.setItem('currentUser', JSON.stringify({token: token }));
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
                    localStorage.setItem('currentUser', JSON.stringify({token: token }));
                    this.router.navigate(['/dashboard']);
                }
            }
        );
    }

    /**
     * Refresh token
     */
    refresh() {     
        return this.http.post('/api/v1/auth/token-refresh/', {'token': this.token})
        .map((r: Response) => (r.json()))
        .subscribe((json) => {
            const token = json.token;
            this.token = token;
            localStorage.setItem('currentUser', JSON.stringify({token: this.token}));
        })
    }
  
    transactions() {
        const headers = this.getHeaders();
        return this.http.get('/api/v1/user/transactions/', {headers: headers})
            .map((response: Response) => response.json());
    }
  
    balances(): Observable<any> {
      const headers = new Headers();
      headers.append('Authorization', 'JWT ' + this.token);
      return this.http.get('/api/v1/user/balances/', {headers: headers})
            .map((response: Response) => response.json());
    }

    protected _currencies: any;

    /**
     * Observable of supported Currencies. 
     * If called initially or refresh is true, an api call is issued.
     * Returns an object of type {SYM: {name: 'Currency', sym: 'SYM'}, ...}
     */
    currencies() {
        return this.http.get('/api/v1/trade/currencies/')
            .map((response: Response) => response.json());
    }

     /**
     * Observable of cryptocurrencies descriptions.
     * Returns an object of type [{currency: 'ETH', text: 'Lorem ipsum...', lang: 'en_US'}, {currency: ...}, ...]
     */
    cryptoDescriptions() {
        return this.http.get('/api/v1/crypto/descriptions/')
            .map((response: Response) => response.json());
    }

    public currencyMap(refresh?: boolean): Observable<any> {
        return new Observable(observer => {
            if (this._currencies) {
              observer.next(this._currencies);
              return observer.complete();
            }
            this.http
              .get('/api/v1/trade/currencies/')
              .map((r: Response) => (r.json() as Array<Currency>))
              .subscribe((currencyMap: any) => {
                this._currencies = currencyMap
                    .filter(currency => currency['sym'] != 'USD')
                    .reduce((obj, currency) => {
                        obj[currency['sym']] = currency;
                        return obj
                }, {});
                observer.next(this._currencies);
                observer.complete();
              });
          });
    
      }

      instant_order(source: string, dest:string, amount:number) {
        const headers = new Headers();
        headers.append('Authorization', 'JWT ' + this.token);
        return this.http.post('/api/v1/trade/instant_order/',
            {
                'source_currency': source,
                'dest_currency': dest,
                'amount': amount
                    
            }, {headers: headers})
            .map((response: Response) => response.json());
    }

    /**
     * Post for Logout
     */
    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
