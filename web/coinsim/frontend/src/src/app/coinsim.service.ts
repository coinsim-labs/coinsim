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
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    /**
     * Routerfunction to check if user logged in
     * TODO: Should be with VERIFY TOKEN??
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
     * 
     * @param username username for new account
     * @param email email for new account
     * @param password password for new account
     */
    register(username: string, email: string, password: string) {
        if(email != "") {
            return this.http.post('/api/v1/auth/signup/', { "username": username, "password": password, "email": email })
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token }));
                    
                    this.router.navigate(['/dashboard']);
                    return true;
                } else {
                    return false;
                }
            });
        } else {
            return this.http.post('/api/v1/auth/signup/', { "username": username, "password": password })
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token }));
                    
                    this.router.navigate(['/dashboard']);
                    return true;
                } else {
                    return false;
                }
            });
        }
        
    }


    login(username: string, password: string) {
        this.logout();
        
        return this.http.post('/api/v1/auth/login/', {"username": username, "password": password})
        .map((response: Response) => {
            let token = response.json() && response.json().token;
            if (token) {
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                
                this.router.navigate(['/dashboard']);
                return true;
            } else {
                return false;
            }
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