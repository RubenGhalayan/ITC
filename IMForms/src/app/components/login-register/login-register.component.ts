import {
    Component,
    Input,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormGroup,
    FormControl
} from '@angular/forms';
import {
    emailValidator,
    matchingPasswords,
    passwordValidator,
    usernameValidator
} from './validators';
import { routing } from '../../app.router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router'
import { UserService } from '../../services/_user/user.service';
import { Res } from '../../services/_models/res';
import { HttpClient } from '../../services/HttpClient';

@Component({
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.less']
})

export class LoginRegisterComponent implements OnInit {
    goHome: any;
    registrationForm: FormGroup;
    loginForm: FormGroup;
    errorMessage: string;
    isRegister: boolean;

    constructor(public fb: FormBuilder, private router: Router,
        private httpClient: HttpClient, private userService: UserService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        if (localStorage.getItem('token') !== null) {
            this.router.navigateByUrl('/home');
            return;
        }
        this.isRegister = false;
        this.errorMessage = 'This field is required';
        this.registrationForm = fb.group({
            name: ['', Validators.compose([Validators.required, usernameValidator])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.compose([Validators.required, passwordValidator])],
            confirmPassword: ['', Validators.required]
        }, {
                validator: matchingPasswords('password', 'confirmPassword')
            })
        this.loginForm = fb.group({
            nameEmail: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    registerData(data) {
        data.email = data.email.toLowerCase();
        this.httpClient.Post('users/addUser', data).subscribe(((response) => {
            if (response.status === 'success') {
                localStorage.setItem('token', response.token);
                localStorage.setItem('name', response.name);
                this.router.navigateByUrl(response.navigate);
            } else {
                this.toastr.error('IMForms', response.data);
                this.registrationForm.reset();
            }
        }),
            err => {
                this.toastr.error('IMForms', err);
            });
        this.registrationForm.reset();
    }

    loginData(data) {
        data.nameEmail = data.nameEmail.toLowerCase();
        this.httpClient.Post('users/verifyUser', data).subscribe(((response) => {
            if (response.status === 'success') {
                localStorage.setItem('token', response.token);
                localStorage.setItem('name', response.name);
                this.router.navigateByUrl(response.navigate);
            } else {
                this.toastr.error('IMForms', response.data);
                this.loginForm.reset();
            }
        }),
            err => {
                this.toastr.error('IMForms', err);
            });
        this.loginForm.reset();
    }

    openRegister() {
        if (false === this.isRegister) {
            this.isRegister = true;
            this.registrationForm.reset();
        }
    }

    changeRoute(routeValue) {
        this.router.navigate([routeValue]);
    }

    ngOnInit() {
        if (localStorage.getItem('statusMessage') != null) {
            this.toastr.success('IMForms', localStorage.getItem('statusMessage'));
            localStorage.removeItem('statusMessage');
        }
    }
}
