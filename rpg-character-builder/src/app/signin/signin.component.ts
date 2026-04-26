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
        @if (signinForm.controls['email'].touched && signinForm.controls['email'].hasError('email')) {
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
  styles: `
  .signin-form-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px 20px;
  }

  form.signinform {
    background-color: #1a1a2e;
    border: 2px solid #b785ff;
    border-radius: 12px;
    padding: 32px 40px;
    width: 100%;
    max-width: 460px;
    box-shadow:
      0 0 8px rgba(183, 133, 255, 0.65),
      0 0 18px rgba(153, 92, 255, 0.55),
      inset 0 0 12px rgba(183, 133, 255, 0.22);
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
    color: #8c61a8;
    text-shadow: 0 0 2px #2d0e58, 0 0 4px #b785ff;
    font-size: 1.6em;
    margin-bottom: 20px;
    text-align: center;
  }

  fieldset {
    border: 1px solid #4a2a6a;
    border-radius: 8px;
    padding: 16px;
  }

  legend {
    font-family: 'Lato', sans-serif;
    color: #b785ff;
    font-size: 0.95em;
    padding: 0 8px;
  }

  label {
    display: block;
    font-family: 'Lato', sans-serif;
    color: #ccbbee;
    margin-top: 12px;
    margin-bottom: 4px;
    font-size: 0.9em;
  }

  input[type="email"], input[type="password"] {
    display: block;
    width: 100%;
    padding: 9px 12px;
    box-sizing: border-box;
    background-color: #0e0e1a;
    border: 1px solid #4a2a6a;
    border-radius: 6px;
    color: #ffffff;
    font-family: 'Merriweather', serif;
    font-size: 0.9em;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input[type="email"]:focus, input[type="password"]:focus {
    outline: none;
    border-color: #b785ff;
    box-shadow: 0 0 6px rgba(183, 133, 255, 0.5);
  }

  input[type="submit"] {
    display: block;
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: #8a3e9b;
    color: #fff;
    border: 1px solid #b785ff;
    border-radius: 6px;
    font-family: 'Lato', sans-serif;
    font-size: 1em;
    cursor: pointer;
    box-shadow: 0 0 6px rgba(183, 133, 255, 0.5), 0 0 14px rgba(153, 92, 255, 0.4);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  input[type="submit"]:hover:not([disabled]) {
    background-color: #6b2e7a;
    box-shadow: 0 0 10px rgba(183, 133, 255, 0.75), 0 0 22px rgba(153, 92, 255, 0.65);
  }

  input[type="submit"]:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .error {
    display: block;
    color: #ff6b8a;
    font-family: 'Lato', sans-serif;
    font-size: 0.8em;
    padding: 4px 2px;
  }
`

})
export class SigninComponent {
  signinForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)])]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    }

    signin() {
      const email = this.signinForm.controls['email'].value;
      const password = this.signinForm.controls['password'].value;

      if(this.authService.signin(email, password)) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigate([returnUrl]);
      } else {
        alert('Invalid email or password. Please try again.');
    }
  }
}