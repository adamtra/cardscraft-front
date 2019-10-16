import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;
    this.user.login(this.loginForm.value).subscribe((data) => {
      localStorage.setItem('token', data);
      this.router.navigate(['/']);
    }, () => {
      this.loading = false;
    });
  }


  get isDisabled() {
    return this.loginForm.invalid || this.loading;
  }

  get loginControl() {
    return this.loginForm.get('email');
  }

  get loginError() {
    return this.loginControl.hasError('required') ? 'Podaj adres email' :
      this.loginControl.hasError('email') ? 'Podaj poprawny email' : '';
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get passwordError() {
    return this.passwordControl.hasError('required') ? 'Podaj hasło' : '';
  }

}
