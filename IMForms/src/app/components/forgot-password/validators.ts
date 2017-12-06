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

