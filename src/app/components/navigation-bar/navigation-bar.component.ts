import { Component, Input } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { MatIconRegistry} from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  @Input() userRole?: string;

  title ='custom icon';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
    ){
    this.matIconRegistry.addSvgIcon(
      'house',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../house.svg')
    )

  }
  logout() {
    this.authService.logout().then(() => {
      // .then(() => { ... }) is used to chain a callback function that will be executed after the logout process is completed. It is executed when the promise returned by this.authService.logout() is resolved.

      this.router.navigate(['/login']); // inside the callback function redirects to login page
    });
  }
}
