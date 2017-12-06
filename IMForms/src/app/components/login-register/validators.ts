import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormGroup,
    FormControl
} from '@angular/forms';

export function emailValidator(control: FormControl): {
    [key: string]: any
} {
    let email = control.value;
    if (email) {
        email = email.trim();
    }
    const emailRegexp = /^[a-zA-Z]+[A-Za-z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,5}$/;
    if (control.value && !emailRegexp.test(email)) {
        return {
            invalidEmail: true
        };
    }
}

export function passwordValidator(control: FormControl): {
    [key: string]: any
} {
    const passRegexp = /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
    if (control.value && !passRegexp.test(control.value)) {
        return {
            invalidPassword: true
        };
    }
}

export function usernameValidator(control: FormControl): {
    [key: string]: any
} {
    let name = control.value;
    if (name) {
        name = name.trim();
    }
    const nameRegexp = /^(?=.*[a-zA-Z])\S*$/;
    if (control.value && !nameRegexp.test(name)) {
        return {
            invalidUsername: true
        };
    }
}

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {
        [key: string]: any
    } => {
        const password = group.controls[passwordKey];
        const confirmPassword = group.controls[confirmPasswordKey];
        if (password.value !== confirmPassword.value) {
            return {
                mismatchedPasswords: true
            };
        }
    }
}
