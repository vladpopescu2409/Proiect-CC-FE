import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent {
  // Injectam AuthService pentru a avea acces la variabila isLoggedIn, cu scopul de a verifica daca user-ul este logat sau nu. Daca nu este logat, componenta admin-home-page nu se va incarca.
 userRole?: string;

  constructor(public authService: AuthService) {
    this.userRole = this.authService.userLoginDetails?.role;
    // console.log(this.userRole);
  }
}
