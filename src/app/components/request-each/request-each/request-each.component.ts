import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestUser } from 'src/app/models/request-user';

@Component({
  selector: 'app-request-each',
  templateUrl: './request-each.component.html',
  styleUrls: ['./request-each.component.css']
}) 
export class RequestEachComponent {
  @Input() requestUser: RequestUser = new RequestUser(); // Initializam un obiect Request gol care va fi populat de metoda getRequests() a componentei parinte (input)
  @Output() newViewDetailsEvent = new EventEmitter<RequestUser>(); // Creem un eveniment care va fi transmis componentei parinte (output)

  // Emite evenimentul newViewDetailsEvent catre componenta parinte pasand ca atribuit elementul requestUser din input
  viewRequestDetails() {
    this.newViewDetailsEvent.emit(this.requestUser);
  }

}
