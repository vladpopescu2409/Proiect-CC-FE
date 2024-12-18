import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent {

  // Creem formularul in ts
  form = new FormGroup({ 

    email: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      // The Validators.pattern validator allows you to specify a regular expression pattern that the input value must match. In this case, the pattern is /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.

      // Let's break down the pattern step by step:

      // ^ and $ are the start and end of the input anchors, respectively. They ensure that the entire input value matches the pattern from start to end.

      // \w+ matches one or more word characters (letters, digits, or underscores). This part matches the initial portion of the email address before the @ symbol.

      // ([\.-]?\w+)* is a capturing group that matches zero or more occurrences of the following:

      // [\.-]? matches an optional dot (.) or hyphen (-) character.
      // \w+ matches one or more word characters. This part matches a portion of the email address between dots or hyphens.
      // @ matches the literal @ symbol, which separates the local part of the email from the domain part.

      // \w+([\.-]?\w+)* is similar to the previous capturing group but matches the domain part of the email address after the @ symbol.

      // (\.\w{2,3})+ is a capturing group that matches one or more occurrences of the following:

      // \. matches a dot (.) character.
      // \w{2,3} matches two to three word characters. This part matches the top-level domain (TLD) portion of the email address, such as .com, .org, or .co.uk.
      // In summary, the pattern /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ is used to validate an email address format. It ensures that the email address has at least one word character before the @ symbol, followed by one or more domain portions separated by dots, with each portion consisting of word characters or optional dots or hyphens. The pattern also enforces a two to three character TLD at the end of the email address.
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Z0-9@*.#]+$/)
      // ^ and $ are the start and end of the input anchors, respectively. They ensure that the entire input value matches the pattern from start to end.

      // [a-zA-Z0-9@*.#] is a character class that matches any single character that is a letter (uppercase or lowercase), a digit, or one of the special characters: @, *, ., #. The + quantifier following the character class means that one or more occurrences of these characters are allowed.
    ])
  });

  errorMessage: string | null = null; // mesajul care se afiseaza cu text diferit in functie de input invalid, credentiale gresite sau erori de conexiune

  // Injectam AuthService pt login si Router pt redirectionare
  constructor(private authService: AuthService, private router: Router) { }

  // Creem metoda submitForm, ce va fi apelata cand se apasa butonul de login
  submitForm() {
    
    // COMMENTED FOR DEBUG ONLY - TO DECOMMENT
    // if (this.form.invalid) { // Daca formularul este receptionat ca invalid
    //   if (this.form.controls.email.errors?.['pattern']) { // Verificam daca este din cauza e-mail-ului
    //     this.errorMessage = 'Invalid e-mail format. Please enter a valid e-mail address.'; // Daca este din cauza e-mail-ului, afisam un mesaj despre asta
    //   } else {
    //     this.errorMessage = 'Invalid credentials. Please try again.'; // Daca este din cauza oricarui alt camp, afisam un mesaj general
    //   }
    //   return;
    // }

    // Apeleaza functia login din AuthService pasand ca parametrii input-urile din formular. In response redirectioneaza catre pagina de admin.
    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe(
        (response) => {

          if (this.authService.userLoginDetails?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/newsfeed']);
          }
        }, (error) => {
          if (error.status === 403) { // 403 = forbidden error
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else { // any other error
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      )
  }

  // Flow-ul este login-module>auth-service>backend-auth
}
