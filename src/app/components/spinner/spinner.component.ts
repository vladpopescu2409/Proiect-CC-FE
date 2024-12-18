//https://danielk.tech/home/angular-how-to-add-a-loading-spinner
import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom // 4 strategies of encapsulation, this one uses the Shadow DOM
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) { }
}