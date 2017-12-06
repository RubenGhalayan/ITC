import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { emailValidator } from './validators';
import { HttpClient } from '../../services/HttpClient';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['../login-register/login-register.component.less'],
})

export class ForgotPasswordComponent implements OnInit {
    registrationForm: FormGroup;
    errorMessage: string;
    isRegister: boolean;

    constructor(private httpClient: HttpClient,
        private router: Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        public fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.isRegister = false;
        this.errorMessage = 'This field is required';
        this.registrationForm = fb.group({
            email: ['', Validators.compose([Validators.required, emailValidator])],
        })
    }

    send(data) {
        const url = 'users/' + data.email.toLowerCase();
        this.httpClient.Get(url).subscribe((response) => {
            if (response.Status === 'OK') {
                localStorage.setItem('statusMessage', 'Check your email for a link to reset your password.');
                this.router.navigate(['login-register']);
            } else {
                this.toastr.error('IMForms', response.Status);
            }
        })
        this.registrationForm.reset();
    }

    ngOnInit() {
        if (localStorage.getItem('statusMessage') != null) {
            this.toastr.error('IMForms', localStorage.getItem('statusMessage'));
            localStorage.removeItem('statusMessage');
        }
    }
}
