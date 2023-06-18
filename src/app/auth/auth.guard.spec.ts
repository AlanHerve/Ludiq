// Import the necessary libraries and components
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';

// Begin the suite of tests for the AuthGuard class
describe('AuthGuard', () => {
  // Declare the necessary variables
  let guard: AuthGuard;
  let userService: UserService;
  let router: Router;

  // Before each test, set up the testing environment
  beforeEach(() => {
    // Create a mock UserService with a method isLoggedIn() that returns true
    const userServiceMock = {
      isLoggedIn: () => true
    };

    // Create a mock Router with a navigate method that is a Jasmine spy
    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    // Set up the test module with the necessary dependencies
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    // Inject the necessary services
    guard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  /**
   * Test to check if the AuthGuard is created correctly
   */
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  /**
   * Test to check if the canActivate method allows access for a logged in user
   */
  it('should allow access for a logged in user', () => {
    userService.isLoggedIn = () => true;
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  /**
   * Test to check if the canActivate method does not allow access for a logged out user
   * and properly redirects to '/hub'
   */
  it('should not allow access for a logged out user and redirect to /hub', () => {
    userService.isLoggedIn = () => false;
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/hub']);
  });
});
