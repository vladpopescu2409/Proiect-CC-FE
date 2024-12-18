import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FaqContent } from 'src/app/models/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-add-faq-modal',
  templateUrl: './add-faq-modal.component.html',
  styleUrls: ['./add-faq-modal.component.css']
})
export class AddFaqModalComponent {
  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;

  constructor(
    public dialogRef: MatDialogRef<AddFaqModalComponent>,
    private aService: FaqService,
    @Inject(MAT_DIALOG_DATA) public data: FaqContent

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


  modalCloseCause: string = '';

  closeModal(): void {
    this.dialogRef.close();
  }




  selectedPDF: File | undefined;
  previewPDF: string | undefined;

  onPDFSelected(event: any) {
    const file: File = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.selectedPDF = file;
      this.previewPDF = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  uploadPDF() {

    if (this.selectedPDF) {
      this.aService.uploadPDF(this.selectedPDF, this.data.id).subscribe(() => {
        // this.modalCloseCause = 'coverImageUploadSuccess';  (this.modalCloseCause)
        this.data.documentState = 'faqHasPDF';
        this.modalCloseCause = 'faqUploadSuccess';
        this.dialogRef.close(this.modalCloseCause);
      },
        (error: any) => {
          console.error(error);
        }
      );
    }

  }



  saveArticle() {
    if (this.data.id) { // if id exists we update

      if (this.data.documentState === 'editPDF') {

        this.uploadPDF();

      } else {
        this.aService.updateFaqContent(this.data).subscribe(() => {
          this.modalCloseCause = 'faqUpdateSuccess';
          this.dialogRef.close(this.modalCloseCause);
        })
      }

    }
    else {
      this.aService.addFaqContent(this.data).subscribe(() => {
        this.modalCloseCause = 'faqAddSuccess';
        this.dialogRef.close(this.modalCloseCause);
      })
    }

  }



}
