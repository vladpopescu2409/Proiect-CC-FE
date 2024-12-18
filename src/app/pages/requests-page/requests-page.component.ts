import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.css']
})
export class RequestsPageComponent {

  userRole?: string;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.userLoginDetails?.role;
    // console.log(this.userRole);
  }

}