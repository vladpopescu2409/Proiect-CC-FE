import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {
  userRole?: string;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.userLoginDetails?.role;
    // console.log(this.userRole);
  }
}
