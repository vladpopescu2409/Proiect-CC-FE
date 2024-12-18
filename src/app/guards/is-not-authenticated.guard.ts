// Se foloseste pentru a bloca accesul la diferite rute utilizatorilor logati / Se atribuie rutelor destinate exclusiv utilizatorilor nelogati (ex. login-page)

import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isNotAuthenticatedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    router.navigateByUrl('/profile');
    return false;
  } else {
    return true;
  }
};


