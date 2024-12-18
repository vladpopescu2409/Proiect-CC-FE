import { Component } from '@angular/core';
import { MatIconRegistry} from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-second-navbar',
  templateUrl: './second-navbar.component.html',
  styleUrls: ['./second-navbar.component.css']
})
export class SecondNavbarComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ){
    this.matIconRegistry.addSvgIcon(
      'house',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../house.svg')
    )

  }
}
