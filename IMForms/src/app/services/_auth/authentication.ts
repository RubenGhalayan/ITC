import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { routing } from '../../app.router';
import { UserService } from '../_user/user.service';
import { Res } from '../_models/res';

@Injectable()
export class Authentication implements CanActivate {

    constructor(private myrouter: Router, private userService: UserService) { }

    canActivate() {
        if (localStorage.getItem('token')) {
            this.userService.isAuthenticated();
            return true;
        }
        localStorage.clear();
        this.myrouter.navigate(['login-register']);
        return false;
    }
}
