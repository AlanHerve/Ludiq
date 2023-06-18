// Import necessary libraries
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

// Uses the Injectable decorator to allow dependency injection into this class
@Injectable({
  providedIn: 'root'
  // Specifies this class is a singleton and can be injected anywhere in the application
})

/**
 * AuthGuard is used to protect routes and control access to users based on certain conditions.
 * It uses the UserService to check if a user is logged in. If not, the user is redirected to '/hub'
 * and the canActivate method returns 'false', blocking access to the route. If the user is logged in,
 * the canActivate method returns 'true', allowing access to the route.
 */
export class AuthGuard {

  constructor(private authService: UserService, private router: Router) {}
  /**
   * Method called by Angular to decide whether a route can be activated or not.
   * It can return an Observable, a Promise or a boolean value.
   * If the user is not logged in, it redirects to '/hub' route and returns 'false'.
   * If the user is logged in, it returns 'true'.
   */
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is not logged in...
    if (!this.authService.isLoggedIn()) {
      // ...redirects to '/hub' route
      this.router.navigate(['/hub']);
      // ...and returns 'false' which means the route cannot be activated
      return false;
    }
    // If the user is logged in, return 'true' which means the route can be activated
    return true;
  }

}
