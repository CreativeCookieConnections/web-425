import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="signin-form-container">
      <form [formGroup]="signinForm" (ngSubmit)="signin();" class="signinform">
      <h1>Welcome Back Please Sign In</h1>

      <fieldset>
        <legend>User Sign In</legend>

        <label for="email">Email:</label>
        <input formControlName="email" type="email" id="email" name="email">
        @if (signinForm.controls['email'].touched && signinForm.controls['email'].hasError('required')) {
        <small class="error"> Email is required.</small>
        }
        @ if (signinForm.controls['email'].touched && signinForm.controls['email'].hasError('email')) {
        <small class="error"> Please enter a valid email address.</small>
        }

        <label for="password">Password:</label>
        <input formControlName="password" id="password" type="password">
        @if (signinForm.controls['password'].touched && signinForm.controls['password'].hasError('required')) {
        <small class="error"> Password is required.</small>
        }
        @if (signinForm.controls['password'].touched && signinForm.controls['password'].hasError('pattern')) {
        <small class="error"> Password must be at least 8 characters long and contain at least one uppercase letter and one number.</small>
        }

        <input type="submit" [disabled]="!signinForm.valid" value="Sign In">
      </fieldset>
      </form>
    </div>
  `,
  styles: ``
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]]
    });
  }

  signin() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      const isSignedIn = this.authService.signin(email, password);
      if (isSignedIn) {
        this.router.navigate(['/dashboard']);
      }
    }
  }
}
