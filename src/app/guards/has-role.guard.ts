// Se foloseste pentru a bloca sau permite accesul la diferite rute in functie de rolul utilizatorilor logati

import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';

// Preia si verifica rolul utilizatorului logat bazandu-se pe variabila userRole, injectata din authService, care stocheaza payload-ul jwt-ului, in care se afla o proprietate pe nume 'role' ce poate avea valoarea 'admin'/'hr'/'employee'.

// Se aplica ca si proprietate 'canActivate' + proprietate 'data:{role:''} in care se mentioneaza denumirea categoriilor de utilziatori autorizati la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii neautorizati   (in app-routing.module.ts)

// Daca utilizatorul face parte din categoria de utilizatori autorizati, has-role.guard.ts returneaza true si astfel request-ul trece mai departe in ruta din app-routing.module.ts

export const hasRoleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router);

  // console.log("user role: "+authService.userRole?.role);

  const userRole = authService.userLoginDetails || { role: 'not-authorized' }
  // daca authService.userRole e undefined sau null inseamna ca user nu este logat; dar ii dam variabilei userRole valoarea de rezerva 'not-authorized' ca sa evitam niste compile errors

  if (authService.userLoginDetails?.role) { // daca user este logat si are 'role' in token

    const authorizedRoles = route.data['roles'] as string[];
    // preia lista de user roles permise sa acceseze ruta sub forma de sir de string-uri citind proprietatea 'roles' din proprietatea 'data' transmisa rutei in app-routing

    if (authorizedRoles.includes(authService.userLoginDetails.role)) {
      return true;
    } else {
      await router.navigateByUrl('');
      // daca utilizatorul nu face parte din grupa de useri autorizati sa acceseze ruta dorita, este redirectionat catre homepage.
      // The await keyword is used to wait for the navigation to complete before proceeding.
      return false;
      // se returneaza false, adica ruta nu poate fi accesata
    }

  } else { // daca user nu e logat/nu are role in token/etc

    await router.navigateByUrl(''); // este redirectionat la ruta default
    return false; // si se returneaza false, adica ruta nu poate fi accesata

  }

  // By using async and await, the guard can handle the promise returned by router.navigateByUrl and ensure it matches the expected return type. We use the async and await keywords to handle the asynchronous navigation using router.navigateByUrl. By returning false after navigating to the default page, we ensure that the guard returns false when the user doesn't have the required role.

};
