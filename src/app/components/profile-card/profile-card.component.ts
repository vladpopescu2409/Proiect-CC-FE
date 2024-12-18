import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit, OnDestroy {

  userProfile: User | undefined;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.getUser();
    
  }

  // response is the data that we require 
  getUser() {
    this.userService.getUserSelf().subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      // console.log(responseUserProfile);
    });
    this.getProfilePicture();
  }

  loadedProfileImage: string | ArrayBuffer | null = null;

  getProfilePicture() {
    this.userService.getProfilePicture().subscribe((response: Blob) => {
      const reader = new FileReader();  // FileReader class allows reading the contents of files
      reader.onloadend = () => { // Assigns a callback function to the onloadend event of the FileReader. The callback function will be executed when the reading operation is completed.
        this.loadedProfileImage = reader.result;
        // The result property of the FileReader contains the loaded data as a data URL string.
        // The data URL represents the profile picture in a format that can be directly used as the source (src) for an <img> tag.  
      };
      reader.readAsDataURL(response);
      // initiates the reading operation by calling the readAsDataURL method of the FileReader.
      // The response object, which is a Blob representing the profile picture, is passed as an argument to read its contents.
    });
  }




  logout() {
    this.authService.logout().then(() => {
      // .then(() => { ... }) is used to chain a callback function that will be executed after the logout process is completed. It is executed when the promise returned by this.authService.logout() is resolved.

      this.router.navigate(['/login']); // inside the callback function redirects to login page
    });
  }


  userSubscription: Subscription = new Subscription();

  isModalOpen = false; // Formularul de edit este prestabilit ascuns
  editedUser = new User();
  modalType = "editModalType";
  modalRole = '';

  actionState: string = '';
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
  }

  editPhoneNumber(user: User) {
    this.editedUser = user;
    this.modalRole = 'editPhoneNumber';
    console.log('PROFILE CARD MODAL ROLE: ' + this.modalRole)
    this.openModal();
  }

  editPassword(user: User) {
    this.editedUser = user;
    this.modalRole = 'editPassword';
    console.log('PROFILE CARD MODAL ROLE: ' + this.modalRole)
    this.openModal();
  }

  editProfilePicture(user: User) {
    this.editedUser = user;
    this.modalRole = 'editProfilePicture';
    console.log('PROFILE CARD MODAL ROLE: ' + this.modalRole)
    this.openModal();
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
