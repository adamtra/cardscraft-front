import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './../../../_helpers/must-watch.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.user.register(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/login']);
    }, () => {
      this.loading = false;
    });
  }

  get isDisabled() {
    return this.registerForm.invalid || this.loading;
  }

  get loginControl() {
    return this.registerForm.get('login');
  }

  get loginError() {
    return this.loginControl.hasError('required') ? 'Podaj login' : '';
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get emailError() {
    return this.emailControl.hasError('required') ? 'Podaj adres email' : 
      this.emailControl.hasError('email') ? 'Podaj poprawny email' : '';
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get passwordError() {
    return this.passwordControl.hasError('required') ? 'Podaj hasło' :
      this.passwordControl.hasError('minlength') ? `Hasło musi mieć minimum ${this.passwordControl.errors.minlength.requiredLength} znaków` : '';
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  get confirmPasswordError() {
    return this.confirmPasswordControl.hasError('required') ? 'Podaj hasło' :
      this.confirmPasswordControl.hasError('mustMatch') ? 'Hasła muszą się pokrywać' : '';
  }

}
