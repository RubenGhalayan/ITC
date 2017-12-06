import {
    ReactiveFormsModule,
    FormBuilder,
    Validators,
    FormGroup,
    FormControl
} from '@angular/forms';

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
