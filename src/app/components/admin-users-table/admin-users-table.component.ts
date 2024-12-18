import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort'; import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css'], 
  encapsulation: ViewEncapsulation.None
})

export class AdminUsersTableComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router) { }

  userSubscription: Subscription = new Subscription();
  

  // SETARI TABEL 
  // userList: User[] = [];  Initializam o lista goala care contine obiecte de tip User. Aceasta va fi populata la ngOnInit cu ajutorul metodei getUsers()
  dataSource = new MatTableDataSource<User>([]); // Initializam o lista goala care contine obiecte de tip User, sub forma MatTableDataSource ca sa poata fi paginabila si filtrabila de catre angular-material

  columnsToDisplay = ['id', 'department', 'position', 'lastName', 'email', 'phoneNumber','joinDate','role', 'action']; // Aici se specifica elementului html mat-table ce coloane din typescript sa se afiseze

  // Am intampinat o problema pentru ca paginator-ul se incarca inaintea datelor si astfel era undefined (din cate am inteles). Aici era prima solutie pe care am implementat-o, folosind ngAfterViewInit si setTimeout, dar dupa am gasit o solutie si mai eleganta (cea de mai jos) (ambele solutii de aici https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized )

  //@ViewChild(MatPaginator) paginator: any = MatPaginator; // Initializeaza paginator-ul din angular material
  //ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
  //setTimeout(() => this.dataSource.paginator = this.paginator, 200);
  // <mat-paginator> element IS inside a container that has an *ngIf on it, which does not render until the data loads asynchronously. This causes this.paginator to be undefined even in ngAfterViewInit. This causes it to silently fail as MatTableDataSource has no problem with you setting paginator to undefined.
  //}

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
    if (this.searchControl.hasError('pattern')){
      return; // if user inputs special characters into searchbar, applyFilter does not reach dataSource / page doesn't reload / nothing is searched
    } else{ 
      const filterValue = (event.target as HTMLInputElement).value; // user input
      this.dataSource.filter = filterValue.trim().toLowerCase(); // toLowerCase because that's how mat-table filter algorithm functions
      // Angular automatically sanitizes the input provided by users when using data binding or property binding. Therefore, when we bind the filterValue to the this.dataSource.filter, it is automatically sanitized.
    }
  }

  





  isLoading = false; // pentru a astepta incarcarea paginii, adica pentru a astepta pana cand se incarca toti utilizatorii
  isModalOpen = false; // Formularul de adaugare utilizatori noi este prestabilit ascuns
  editedUser = new User(); 
  modalType = "";
  modalRole = "admin";
 
  ngOnInit(): void {
    this.getUsers();
  }



  // apeleaza functia getUsers() din serviciul user injectat si populeaza lista existenta
  getUsers() {
    this.isLoading = true; // am setat isLoading pe true la inceputul unui proces care poate dura mai mult

    this.userSubscription =
      this.userService.getUsers().subscribe((responseUserList) => {
        // console.log(responseUserList);
        // this.userList = responseUserList;

        this.dataSource = new MatTableDataSource(responseUserList); // atribuim rezultatul request-ului listei ce va fi afisata in mat-table

        this.isLoading = false; // doar dupa ce se vor finaliza intructiunile time consuming variabila isLoading va fi setata inapoi pe false
      });
  }


  actionState:string='';
  handleActionStateChange(newState: string) {
    // Handle the updated action state
    this.actionState = newState;
  }


  body: any = document.querySelector("body");

  openModal() {
    this.isModalOpen = true;
    this.body.style.overflow = "hidden";
    this.actionState = '';
  }
  closeModal() {
    this.isModalOpen = false;
    this.body.style.overflow = "auto";
    this.editedUser = new User();
    this.modalType = '';
  }

  editUser(user: User) {
    this.modalType = 'editModalType'
    this.editedUser = user;
    this.openModal();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}