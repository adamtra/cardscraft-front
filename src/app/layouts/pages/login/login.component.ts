import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
      login: ['', Validators.compose([
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

  getErrorMessage(control: FormControl) {
    return control.hasError('required') ? 'Wpisz wartość' :
      control.hasError('email') ? 'Podaj adres email' : '';
  }

  get isDisabled() {
    return this.loginForm.invalid || this.loading;
  }

  get loginControl() {
    return this.loginForm.get('login');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

}
