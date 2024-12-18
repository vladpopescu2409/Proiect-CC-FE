import { Component, EventEmitter, Input, OnInit, Output, SecurityContext, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestHrService } from 'src/app/services/request-hr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestUser } from 'src/app/models/request-user';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
})
export class RequestsUserComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private requestHrService: RequestHrService) { }



  @Output() userProfile: User = new User();

  @Input() @Output() userRole?: string;

  // FORMULAR v =======================================================================================================================================================

  reqTypes: string[] = ['Paid_leave', 'Medical_leave', 'Training_request', 'Change_personal_data', 'Employed_status', 'Resignation', 'Custom_request'];
  selectedReqType: string = '';

  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = (<HTMLSelectElement>document.getElementById('reqType')).value; // schimba valoarea selected request type
    this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
    this.errorMessage = '';
    this.actionState = '';
  }



  datasToChange: string[] = ['First name', 'Last name'];
  selectedDataToChange: string = '';




  // Urmareste valoarea campului data to change (care este un dropdown cu mai multe optiuni)
  onDataToChangeChange() {
    this.selectedDataToChange = (<HTMLSelectElement>document.getElementById('dataToChange')).value; // schimba valoarea selected request type

    console.log(this.selectedDataToChange);
    this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
  }



  errorMessage: string = '';

  submitRequestSubscription: Subscription = new Subscription();

  actionState:string='';
  

  ngOnInit() {
    this.getUser(); // obtinem datele utilizatorului logat
    this.getAllRequestsByUser();
  }

  // response is the data that we require 
  getUser() {
    this.userService.getUserSelf().subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      console.log('NAME:' + responseUserProfile.lastName);
    });
  }



  requestForm = new FormGroup({
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ])
  })









  // LEAVE APPLY V=======================================================================================================================================================

  startDate: string = ''; // variable to store the start date
  endDate: string = ''; // variable to store the end date

  maxEndDate: string = ''; // variable to store max selectable end date based on the inputted start date

  // PAID LEAVE ====================================================================================

  onPaidLeaveStartDateFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    input.type = "date"; // schimba type-ul elementului din text in date, adica face placeholder sa dispara si afiseaza calendar
    input.min = new Date().toISOString().split("T")[0]; // startul pentru concediu de odihna se poate face doar incepand din ziua curenta catre viitor
  }

  // modifica maxdate al inputului end date in mod dinamic, bazandu-se pe valoarea input-ului start date. Un angajat isi poate lua maxim 3 luni consecutive de concediu de odihna
  onPaidLeaveStartDateInput(event: any) {
    const startDate = event.target.value;
    if (startDate) {
      const maxDate = new Date(startDate);
      maxDate.setMonth(maxDate.getMonth() + 3); // Add 3 months to the start date
      this.maxEndDate = maxDate.toISOString().split("T")[0];
      this.startDate = startDate; // salveaza start date
    }
  }

  onPaidLeaveEndDateFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    input.type = "date"; // schimba type-ul elementului din text in date, adica face placeholder sa dispara si afiseaza calendar
    input.min = this.startDate; // sfarsitul pentru concediu de odihna se poate face doar incepand din ziua de start catre viitor
  }

  // MEDICAL LEAVE ====================================================================================

  onMedicalLeaveStartDateFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    const currentDate = new Date();
    const minDate = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000); // Subtract 14 days (2 weeks) from the current date
    const minDateString = minDate.toISOString().split("T")[0];
    input.type = "date"; // schimba type-ul elementului din text in date, adica face placeholder sa dispara si afiseaza calendar
    input.min = minDateString; // concediul medica poate fi aplicat incepand de maxim 2 saptamani in trecut fata de ziua curenta
  }

  // modifica maxdate al inputului end date in mod dinamic, bazandu-se pe valoarea input-ului start date. Un angajat isi poate lua maxim 9 luni consecutive de concediu medical
  onMedicalLeaveStartDateInput(event: any) {
    const startDate = event.target.value;
    if (startDate) {
      const maxDate = new Date(startDate);
      maxDate.setMonth(maxDate.getMonth() + 9); // Add 9 months to the start date
      this.maxEndDate = maxDate.toISOString().split("T")[0];
      this.startDate = startDate; // salveaza start date
    }
  }

  onMedicalLeaveEndDateFocus(event: Event) {
    const input = event.target as HTMLInputElement;
    input.type = "date"; // schimba type-ul elementului din text in date, adica face placeholder sa dispara si afiseaza calendar
    input.min = this.startDate; // concediul medica poate fi aplicat incepand de maxim 2 saptamani in trecut fata de ziua curenta
  }


  onEndDateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.endDate = input.value; // salveaza end date
  }

  // LEAVE APPLY ^=====================================================================================================================================================



  // o sa fie aplicat pe cererile in care exista input text din partea utilizatorului
  sanitizeInput(input?: string) {
    if (input == null) {
      return '';
    }
    // Sanitize the input to prevent XSS
    const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, input!);
    // Return the sanitized input
    return sanitizedInput || '';
  }


  submitRequest() {

    if (this.selectedReqType === 'Paid_leave' || this.selectedReqType === 'Medical_leave') {

      const leaveIntervalString = `${this.startDate}_${this.endDate}`; // creem formatul necesar ce trebuie transmis in baza de date bazat pe valorile introduse de utilizator

      this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, leaveIntervalString).subscribe(() => {
        console.log(this.selectedReqType + ' applied for period: ' + leaveIntervalString);
        this.actionState = '';
        this.getAllRequestsByUser(); // se da refresh la tabelul de requests
        this.errorMessage = ''; // in caz ca inainte am introdus ceva gresit si dupa corect, vrem sa scapam de error message
        this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
        this.startDate = ''; // reinitializeaza valoarea start date 
        this.endDate = ''; // reinitializeaza valoarea end date
        this.actionState = 'success';
      })

    } else if (this.selectedReqType === 'Change_personal_data') {

      if(this.errorMessage) {this.errorMessage='';}

      let changeDataStringFormat = ``;

      // verificam manual input-ul utilizatorului
      switch (true) {
        case (!!!this.requestForm.value.details):
          this.errorMessage = 'Required field.';
          return;
        case (this.requestForm.value.details?.length === undefined || this.requestForm.value.details.length < 2):
          console.log('mustcontain2');
          this.errorMessage = 'Must contain minimum 2 characters.';
          return;
        case (this.requestForm.value.details?.length || 0 > 20):
          this.errorMessage = 'Can contain maximum 250 characters.';
          return;
      }

      // creem manual/hardcodat string-ul sub formatul necesar pentru requestul catre baza de date, bazat pe campul selectat de utilizator
      // formatul necesar la momentul actual pentru request-ul in baza de date este columnName_oldValue_columnName_newValue 
      switch (this.selectedDataToChange) {
        case 'First name':
          changeDataStringFormat = ('firstName_' + this.userProfile.firstName + '_firstName_' + this.requestForm.value.details);
          // console.log(changeDataStringFormat);

          this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, changeDataStringFormat).subscribe(() => {
            console.log('change first name submitted');
            this.actionState = '';
            this.getAllRequestsByUser(); // se da refresh la tabelul de requests
            this.errorMessage = ''; // in caz ca inainte am introdus ceva gresit si dupa corect, vrem sa scapam de error message
            this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
            this.actionState = 'success';
          })
          
          break;
        case 'Last name':
          changeDataStringFormat = 'lastName_' + this.userProfile.lastName + '_lastName_' + this.requestForm.value.details;
          // console.log(changeDataStringFormat);

          this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, changeDataStringFormat).subscribe(() => {
            console.log('change last name submitted');
            this.actionState = '';
            this.getAllRequestsByUser(); // se da refresh la tabelul de requests
            this.errorMessage = ''; // in caz ca inainte am introdus ceva gresit si dupa corect, vrem sa scapam de error message
            this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
            this.actionState = 'success';
          })

          break;
      }
    } else if (this.selectedReqType === 'Resignation') {

      this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, "").subscribe(() => {
        console.log('RESIGNATION SUBMITTED');
        this.actionState = '';
        this.getAllRequestsByUser(); // se da refresh la tabelul de requests
        this.errorMessage = ''; // in caz ca inainte am introdus ceva gresit si dupa corect, vrem sa scapam de error message
        this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
        this.actionState = 'success';
      })

    }
    else {

      // Verificam formularul
      if (this.requestForm.invalid) {

        switch (true) {
          case !!this.requestForm.controls.details.errors?.['required']:
            this.errorMessage = 'Required field.';
            break;
          case !!this.requestForm.controls.details.errors?.['minlength']:
            this.errorMessage = 'Must contain minimum 10 characters.';
            break;
          case !!this.requestForm.controls.details.errors?.['maxlength']:
            this.errorMessage = 'Can contain maximum 250 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }

        return;
      }

      const sanitiziedDetails = this.requestForm.value.details
        ? this.sanitizer.sanitize(SecurityContext.HTML, this.requestForm.value.details) || ''
        : ''
        ;

      this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, sanitiziedDetails).subscribe(() => {

        console.log('DETAILS:'+sanitiziedDetails);
        console.log('REQUEST WITH SANITIZED DETAILS SUBMITTED');
        this.actionState = '';
        this.getAllRequestsByUser();
        this.errorMessage = '';
        this.requestForm.patchValue({ details: undefined }); // reinitializeaza valoarea details a formularului
        this.actionState = 'success';
      })


    }
  }



  // FORMULAR ^ =======================================================================================================================================================


  // REQUESTS HISTORY v ================================================================================================================================================

  isLoading = false; // pentru a astepta incarcarea paginii, adica pentru a astepta pana cand se incarca toti utilizatorii
  editedRequest = new RequestUser();
  isModalOpen = false; // Formularul de vizulizare detalii cerere este prestabilit ascuns

  requestSubscription: Subscription = new Subscription();



  // SETARI TABEL 
  dataSource = new MatTableDataSource<RequestUser>([]); // Initializam o lista goala care contine obiecte de tip RequestUser, sub forma MatTableDataSource ca sa poata fi paginabila si filtrabila de catre angular-material

  columnsToDisplay = ['id', 'requestType', 'status', 'requestDate', 'finishDate', 'action']; // Aici se specifica elementului html mat-table ce coloane din typescript sa se afiseze

  // Am intampinat o problema pentru ca paginator-ul se incarca inaintea datelor si astfel era undefined (din cate am inteles). Am gasit solutii aici https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  searchControl = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]); // Make search bar accept only alphanumeric 
  applyFilter(event: Event) {
    if (this.searchControl.hasError('pattern')) {
      return; // if user inputs special characters into searchbar, applyFilter does not reach dataSource / page doesn't reload / nothing is searched
    } else {
      const filterValue = (event.target as HTMLInputElement).value; // user input
      this.dataSource.filter = filterValue.trim().toLowerCase(); // toLowerCase because that's how mat-table filter algorithm functions
      // Angular automatically sanitizes the input provided by users when using data binding or property binding. Therefore, when we bind the filterValue to the this.dataSource.filter, it is automatically sanitized.
    }
  }



  body: any = document.querySelector("body");

  openModal() {
    this.isModalOpen = true;
    this.body.style.overflow = "hidden";
  }
  closeModal() {
    this.isModalOpen = false;
    this.body.style.overflow = "auto";
    this.editedRequest = new RequestUser();
    // this.modalType = '';
  }

  // editUser(user: User) {
  //   this.modalType = 'editModalType'
  //   this.editedUser = user;
  //   this.openModal();
  // }

  viewDetails(requestUser: RequestUser) {
    // this.modalType 
    this.editedRequest = requestUser;
    this.openModal();
  }

  // apeleaza functia getRequests() din serviciul RequestUser injectat si populeaza lista
  getAllRequestsByUser() {
    this.isLoading = true; // am setat isLoading pe true la inceputul unui proces care poate dura mai mult

    this.requestSubscription =
      this.requestHrService.getAllRequestsByUser().subscribe((responseRequestsList) => {
        // console.log(responseRequestsList);

        this.dataSource = new MatTableDataSource(responseRequestsList.reverse()); // atribuim rezultatul request-ului listei ce va fi afisata in mat-table

        this.isLoading = false; // doar dupa ce se vor finaliza intructiunile time consuming variabila isLoading va fi setata inapoi pe false
      });
  }




  // REQUESTS HISTORY ^ ================================================================================================================================================
}






