import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

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
            console.log('Response', response.json());
            if (response.json().token) {
                return true;
            } else {
                return false;
            }
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
        const headers = this.getHeaders();
        return this.http.get('/api/v1/user/transactions/', {headers: headers})
            .map((response: Response) => response.json());
    }
  
    balances() {
         const headers = this.getHeaders();
         return this.http.get('/api/v1/user/balances/', {headers: headers})
            .map((response: Response) => response.json());
    }

    /**
     * Get for currencies
     */
    currencies() {
        return this.http.get('/api/v1/trade/currencies/')
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
