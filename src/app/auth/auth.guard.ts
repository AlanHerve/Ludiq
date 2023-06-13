import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/hub']);
      return false;
    }
    return true;
  }

  canActivateOrganization(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn() && !this.authService.isPartOfOrganization(2)){
      this.router.navigate(['/hub']);
      return false;
    }else if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;

  }
}
