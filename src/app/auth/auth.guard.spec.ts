import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    const userServiceMock = {
      isLoggedIn: () => true
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for a logged in user', () => {
    userService.isLoggedIn = () => true;
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should not allow access for a logged out user and redirect to /hub', () => {
    userService.isLoggedIn = () => false;
    const result = guard.canActivate();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/hub']);
  });
});
