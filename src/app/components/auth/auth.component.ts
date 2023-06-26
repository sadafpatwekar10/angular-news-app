import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  authForm!: FormGroup;
  error!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (this.authForm.valid) {
      if (this.isLoginMode) {
        this.authService
          .login(this.authForm.value.email, this.authForm.value.password)
          .subscribe({
            next: () => this.router.navigate(['/news']),
            error: (errorMessage) => (this.error = errorMessage),
          });
      } else {
        this.authService
          .register(this.authForm.value.email, this.authForm.value.password)
          .subscribe({
            next: () => this.router.navigate(['/news']),
            error: (errorMessage) => (this.error = errorMessage),
          });
      }
    } else return;
  }
}
