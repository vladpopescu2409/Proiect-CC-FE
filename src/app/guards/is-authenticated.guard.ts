// Se foloseste pentru a bloca accesul la diferite rute utilizatorilor nelogati / Se atribuie rutelor destinate exclusiv utilizatorilor logati

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs'; 

// Verifica daca utilizatorul este autentificat in functie de valoarea variabilei isLoggednIn$, injectata din authService, care isi schimba valoarea la login sau la logout. Daca utilzatorul nu este logat, este redirectionat catre pagina de login.

// Se aplica ca si proprietate canActivate la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii nelogati. (in app-routing.module.ts)

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if(!isLoggedIn){
        router.navigate(['login']);
      }
    })
  )
};
