import { Injectable } from '@angular/core';
import { Res } from '../_models/res';
import { Router } from '@angular/router';
import { HttpClient } from '../HttpClient';

@Injectable()
export class UserService {

    constructor(private router: Router, private httpClient: HttpClient) { }

    Logout() {
        localStorage.clear();
        this.router.navigateByUrl('/login-register');
    }

    isAuthenticated() {
        this.httpClient.Get('users/validToken').subscribe(((response) => {
            if (response.status === 'success') {
                return;
            } else {
                this.Logout();
            }
        }),
            err => {
                console.log(err);
            });
    }
}
