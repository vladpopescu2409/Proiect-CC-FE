import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

// Aceasta componenta reprezinta fiecare intrare din lista ce va aparea pe pagina administratorului. 
// Este componenta copil a componentei admin-home-page.

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
}) 
export class UserComponent implements OnDestroy {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }; // Injectam serviciul user pentru a putea folosii metodele din acesta (crud http requests in cazul nostru)

  deleteUserSubscription: Subscription = new Subscription();

  @Input() user: User = new User(); // Initializam un obiect User gol care va fi populat de metoda getUsers() a componentei parinte (input)
  @Output() newGetUsersEvent = new EventEmitter<string>(); // Creem un eveniment nou care va fi transmis componentei parinte (output)
  @Output() newEditUserEvent = new EventEmitter<User>();
  @Input() page:String = '';

  actionState: string = '';
  @Output() actionStateChange: EventEmitter<string> = new EventEmitter<string>();

  // Emite evenimentul newEditUserEvent catre componenta parinte pasand ca si atribut user-ul din input
  editUser() {
    this.newEditUserEvent.emit(this.user);
  }

  // apeleaza functia deleteUser() din serviciul user injectat iar apoi emite un eveniment-ul newGetUsersEvent catre componenta parinte
  deleteUser() {
    this.deleteUserSubscription = this.userService.deleteUser(this.user.id || 0).subscribe((response) => { // 

      this.actionState = 'userArchived';
      this.actionStateChange.emit(this.actionState);

      this.newGetUsersEvent.emit();
    })
  }
  
  logout() {
    this.authService.logout().then(() => {
      // .then(() => { ... }) is used to chain a callback function that will be executed after the logout process is completed. It is executed when the promise returned by this.authService.logout() is resolved.

      this.router.navigate(['/login']); // inside the callback function redirects to login page
    });
  }

  ngOnDestroy(): void {
    this.deleteUserSubscription.unsubscribe();
  }

}
