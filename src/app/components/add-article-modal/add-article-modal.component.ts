import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsletterArticle } from 'src/app/models/newsletter-article';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.css']
})
export class AddArticleModalComponent {
  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;

  constructor(
    public dialogRef: MatDialogRef<AddArticleModalComponent>,
    private aService: NewsletterService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: NewsletterArticle
  ) { 
    // adaugam in mod dinamic fisierul ce contine logica pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesScriptElement = document.createElement("script");
    this.particlesScriptElement.src = "assets/particles.js";
    document.body.appendChild(this.particlesScriptElement);

    // adaugam in mod dinamic fisierul ce contine setarile pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesSettingsScriptElement = document.createElement("script");
    this.particlesSettingsScriptElement.src = "assets/particles-settings.js";
    document.body.appendChild(this.particlesSettingsScriptElement);

    // adaugam in mod dinamic elementul ce contine scriptul pentru hostingul? fundalului animat
    this.particlesHostingElement = document.createElement("script");
    this.particlesHostingElement.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    document.body.appendChild(this.particlesHostingElement);
  }

  ngOnInit() {
    
  }


  modalCloseCause:string = ''; 

  closeModal(): void {
    this.dialogRef.close();
  }



  



  selectedCoverImage: File | undefined;
  previewCoverImage: string | undefined;

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.onload = () => {
      this.selectedCoverImage = file;
      this.previewCoverImage = reader.result as string;
    };
  
    reader.readAsDataURL(file); 
  }

  uploadCoverImage() {

    if (this.selectedCoverImage) {
      this.aService.uploadCoverImage(this.selectedCoverImage,this.data.id).subscribe(() => {
        this.modalCloseCause = 'coverImageUploadSuccess';  
        this.dialogRef.close(this.modalCloseCause);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }

  }






  saveArticle() {
    this.data.createdDate = new Date();
    // we need to get the user first otherwise it wouldn't work 
    this.userService.getUserSelf().subscribe(user => {
      this.data.createdBy = user; //we get the whole user

      if (this.data.id) { // if id exists we update

        if (this.data.coverImageState === 'editCoverImage') {

          this.uploadCoverImage();

        } else {

          this.aService.updateNewsletterArticle(this.data).subscribe(() => {
            this.modalCloseCause = 'articleUpdateSuccess';
            this.dialogRef.close(this.modalCloseCause);
          })

        }

      }
      else { //if id doesn't exist we add article
        this.aService.addNewsletterArticle(this.data).subscribe(() => {
          this.modalCloseCause = 'articleAddSuccess';
          this.dialogRef.close(this.modalCloseCause);
        })
      }
    });
  }

}
