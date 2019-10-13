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
  public submitted = false;

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

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.user.register(this.registerForm.value).subscribe((data) => {
      localStorage.setItem('token', data);
    }, () => {
      this.loading = false;
      alert('Utworzyłeś konto.\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    });
  }

  get isDisabled() {
    return this.registerForm.invalid || this.loading;
  }
}
