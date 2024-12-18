
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

//https://blog.angular-university.io/angular-file-upload/ - other option


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {
  constructor(
    private http:HttpClient
  ){}
 name: string ='';
 file: any;

 getFile(event:any){
  this.file =event.target.files[0];
  console.log('file',this.file);

 }
 submitData(){
  // create formData object
  let formData = new FormData();
  formData.set ("name", this.name)
  formData.set("file",this.file)
  //submit this data in API - this is just a placeholder
  this.http.post('http://localhost:8082/article/upload-image?id=${this}',formData).subscribe(
    (response) => {});

 }

// @Input()
// requiredFileType?:string;

// fileName = '';
// uploadProgress?:number;
// uploadSub?: Subscription;

// constructor(private http: HttpClient) {}

// onFileSelected(event: Event) {
//     const file:File = (event.target as HTMLInputElement).files[0];

//     if (file) {
//         this.fileName = file.name;
//         const formData = new FormData();
//         formData.append("thumbnail", file);

//         const upload$ = this.http.post("/api/thumbnail-upload", formData, {
//             reportProgress: true,
//             observe: 'events'
//         })
//         .pipe(
//             finalize(() => this.reset())
//         );

//         this.uploadSub = upload$.subscribe(event => {
//           if (event.type == HttpEventType.UploadProgress) {
//             this.uploadProgress = Math.round(100 * (event.loaded / event.total));
//           }
//         })
//     }
// }

// cancelUpload() {
// this.uploadSub.unsubscribe();
// this.reset();
// }

// reset() {
// this.uploadProgress = null;
// this.uploadSub = null;
// }

}
