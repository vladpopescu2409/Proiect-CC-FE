import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginDetails, User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _isLoggedIn$ = new BehaviorSubject(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  //   The _isLoggedIn$ property is declared as private, which means it can only be accessed within the class itself and not from outside. It is assigned a new instance of the BehaviorSubject class with an initial value of false.

  // BehaviorSubject is a type of Observable provided by RxJS that emits the most recent value to its subscribers and also allows you to set an initial value.

  //   The isLoggedIn$ property is declared without the private access modifier, which means it can be accessed from outside the class. It is assigned the result of calling the asObservable() method on the _isLoggedIn$ BehaviorSubject. 

  // The asObservable() method returns an Observable that can be subscribed to, but it does not allow direct modification of the underlying BehaviorSubject.

  // By providing the isLoggedIn$ property as an observable, it allows other parts of the codebase to subscribe to changes in the login status. This follows the principle of encapsulation, where the internal state (_isLoggedIn$) is kept private, and a read-only version (isLoggedIn$) is exposed to the outside world.

  // In summary, the code creates a private _isLoggedIn$ BehaviorSubject instance variable with an initial value of false. It also exposes a public isLoggedIn$ property as an observable, derived from the private BehaviorSubject, enabling external code to subscribe to changes in the login status without directly modifying the internal state.

  private readonly TOKEN_NAME = 'hr connect auth';
  // Vom folosii aceasta denumire pentru token-ul ce va fi setat in local storage in momentul login-ului

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
    // Obtinem valoarea token-ului stocat local storage
  }

  userLoginDetails?: LoginDetails;
  // Va stoca valoarea proprietatii 'role' din JWT stocat in local storage

  

  constructor(private userService: UserService, private router: Router) {
    this._isLoggedIn$.next(!!this.token)
    // next = is used to emit values in the context of Observables and Subjects. It allows you to publish values to the subscribers of the Observable or Subject, enabling the propagation of data through the reactive streams.
    // Aplicam asta ca atunci cand dam refresh la pagina, utilizatorii logati sa ramana logati

    this.userLoginDetails = this.token ? this.getUserRole(this.token) : undefined;
    // The ternary operator is used to conditionally assign the value of this.getUserRole(this.token) to this.userRole if this.token is not null. If this.token is null, this.userRole is assigned the value undefinied.
    // Daca this.token e null atunci this.userRole este undefined. Daca this.token nu e null, inseamna ca avem un utilizator logat si ca exista un token in local storage, pe care putem aplica metoda de getUserRole.
  }


  login(email: any, password: any) {
    return this.userService.login(email, password).pipe(
      // It appeals the login function from the backend/user-service
      // A pipe is a function or operator that allows us to pass the output of a function as the input of another. 
      // The pipe function is called on the result of userService.login, indicating that some operators will be applied to the resulting observable


      tap((response: any) => {
        // IL SETAM CA SI LOGAT
        // tap operator from the RxJS library to perform a side effect without modifying the emitted values. The tap operator takes a callback function that will be executed for each emitted value. In this case, the callback function takes one parameter response of type any, which represents the response received from the login method.
        localStorage.setItem(this.TOKEN_NAME, 'Bearer '+response.token);
        // We know that the response will have a property named token. So it's important to keep the name of the variable like this in user-service/backend.
        this._isLoggedIn$.next(true);
        // This line calls the 'next' method on an instance variable _isLoggedIn$ of type Subject<boolean>. It emits the value true, indicating that the user is logged in.

        console.log("USER ROLE: "+this.userLoginDetails?.role);
        // II IDENTIFICAM ROLUL
        this.userLoginDetails = response.token ? this.getUserRole(response.token) : undefined;
        // The ternary operator is used to conditionally assign the value of this.getUserRole(responde.token) to this.userRole if this.token is not null. If this.token is null, this.userRole is assigned the value undefinied.
        // Daca response.token e null atunci this.userRole este undefined. Daca response.token nu e null, inseamna ca avem un utilizator logat si ca exista un token in local storage, pe care putem aplica metoda de getUserRole.
        console.log("USER ROLE: "+this.userLoginDetails?.role);
      })
    );

    //  To summarize, the login method calls the userService.login method with the provided email and password parameters. It then performs some side effects using the tap operator, such as storing the received token in the localStorage and emitting a true value to indicate that the user is logged in. The overall result is an observable that can be subscribed to.
  }

  logout() {
    return new Promise<void>((resolve) => { // It creates a new Promise that resolves to void. The resolve function is passed as an argument to the promise executor function.
      localStorage.removeItem(this.TOKEN_NAME);
      this._isLoggedIn$.next(false);
      resolve(); //It resolves the promise by calling resolve(), indicating that the logout process has completed.
    });
  }

  isLoggedIn(){
    if(this._isLoggedIn$.value){return true}
    return false;
  }


  private getUserRole(token: string): LoginDetails {
    return JSON.parse(atob(token.split(".")[1])) as LoginDetails;
    // JWT contine 3 parti: header.payload.signature ; departite intre ele printr-un punct. Role-ul se afla in payload, asa ca folosim functia split dupa punct si luam elementul cu index-ul 1 pentru a accesa payload-ul.

    // atob = ascii to binary, decodeaza payload-ul (care este un text encodat in base64) intr-un string cu sintaxa asemanatoare JSON

    // JSON.parser preia un string si il transforma intr-un JSON

    // Rezumand, aceasta functie returneaza un fisiere text de tip JSON cu payload-ul JWT-ului; din care preia doar proprietatile unui obiect de tip user (noi preluam doar role)
  }

  hasRole(role: string): boolean {
    return this.userLoginDetails?.role.includes(role) || false;
  }

} 
