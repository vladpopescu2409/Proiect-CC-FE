import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {

  userRole?: string;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.userLoginDetails?.role;
    // console.log(this.userRole);
  }
}
