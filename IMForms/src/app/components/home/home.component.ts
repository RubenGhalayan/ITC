import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/_user/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
    public userName = localStorage.getItem('name');

    constructor(private router: Router, private userService: UserService) {
        this.userService.isAuthenticated();
    }

    ngOnInit() { }

    changeRoute(routeValue) {
        this.router.navigate([routeValue]);
    }

    Logout() {
        this.userService.Logout();
    }
}
