import {
    Component,
    Input,
    OnInit,
    ViewContainerRef
} from '@angular/core';
import { HttpClient } from '../../services/HttpClient';
import { ActivatedRoute } from '@angular/router';
import { routing } from '../../app.router';
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormGroup,
    FormControl
} from '@angular/forms';
import {
    matchingPasswords,
    passwordValidator,
} from './validators';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['../login-register/login-register.component.less'],
})

export class ResetPasswordComponent implements OnInit {
    sub: any;
    token: any;
    registrationForm: FormGroup;
    errorMessage: string;
    isRegister: boolean;

    constructor(private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.sub = this.route.params.subscribe(params => {
            this.token = params['token'];
        });
        const url = 'users/resetPassword/' + this.token;
        this.httpClient.Get(url).subscribe((response) => {
            if (response.Status !== 'OK') {
                localStorage.setItem('statusMessage', response.Status);
                this.router.navigate(['forgot-password']);
            }
        });
        this.isRegister = false;
        this.errorMessage = 'This field is required';
        this.registrationForm = fb.group({
            password: ['', Validators.compose([Validators.required, passwordValidator])],
            confirmPassword: ['', Validators.required]
        }, {
                validator: matchingPasswords('password', 'confirmPassword')
            })
    }

    reset(data) {
        const url = 'users/' + this.token;
        const body = { 'password': data.password };
        this.httpClient.put(url, body).subscribe((response) => {
            if (response.Status === 'OK') {
                localStorage.setItem('statusMessage', 'Password changed');
                this.router.navigate(['login-register']);
            } else {
                localStorage.setItem('statusMessage', 'Invalid token');
                this.router.navigate(['forgot-password']);
            }
        });
        this.registrationForm.reset();
    }

    ngOnInit() { }
}
