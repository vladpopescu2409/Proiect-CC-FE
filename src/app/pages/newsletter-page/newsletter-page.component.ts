import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter-page.component.html',
  styleUrls: ['./newsletter-page.component.css'] 
})
export class NewsletterPageComponent {
  userRole?: string;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.userLoginDetails?.role;
    // console.log(this.userRole);
  }
}
