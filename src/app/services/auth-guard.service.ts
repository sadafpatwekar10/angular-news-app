import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route): boolean {
    if (this.authService.isLoggedOut()) {
      this.router.navigate(['/auth']);
    }
    return true;
  }
}
