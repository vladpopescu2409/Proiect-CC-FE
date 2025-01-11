import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaqContent } from '../models/faq';
//we need this to map the order of the faqs
import { map } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient, private envService: EnvService) {
  }
  getFaqContent(): Observable<FaqContent[]> {
    return this.http.get<FaqContent[]>(`${this.envService.backendAddress}/faq/all`).pipe(
      map((faqs: FaqContent[]) => faqs.sort((a, b) => a.orderNumber - b.orderNumber))
    ) as Observable<FaqContent[]>;
  }

  getFaqContentByOrder(order: number) {
    return this.http.get(`${this.envService.backendAddress}/faq/${order}`) as Observable<FaqContent>
  }

  addFaqContent(postObject: FaqContent) {
    return this.http.put(`${this.envService.backendAddress}/faq`, postObject) as Observable<FaqContent>
  }

  // updateFaqContent(postObject: FaqContent) {
  //   return this.http.put(`http://localhost:8082/faq/${postObject.id}`, postObject) as Observable<FaqContent>
  // } 




  uploadPDF(pdf: File, id: number): Observable<FaqContent> {
    const formData = new FormData();
    formData.append('file', pdf, pdf.name);
    formData.append('id', id.toString());


    //afiseaza body ul request-ului
    console.log('UPLOAD COVER IMAGE BODY: ');
    const result: { [key: string]: string | number | File } = {};
    formData.forEach((value, key) => {
      if (value instanceof File) {
        result[key] = value;
      } else {
        result[key] = key === 'image' ? +value : value;
      }
    });
    console.log(result);


    return this.http.post<FaqContent>(`${this.envService.backendAddress}/faq/upload-file`, formData);
  }



  getPDF(id: number): Observable<File> {
    return this.http.get(`${this.envService.backendAddress}/faq/get-file?id=${id}`, { responseType: 'blob' })
      .pipe(
        map((response: Blob) => {
          const file = new File([response], `document_${id}.pdf`, { type: 'application/pdf' });
          return file;
        })
      );
  }
  // The responseType option is set to 'blob', indicating that the response should be treated as a binary blob.
  // The map operator is used to transform the response into a File object.
  // The transformed File object is returned as an Observable<File>.
  // By specifying the response type as 'blob', you can access the raw binary data of the PDF file, create a File object using that data, and return it as the result of the observable.












  updateFaqContent(postObject: FaqContent) {
    return this.http.post(`${this.envService.backendAddress}/faq`, postObject) as Observable<FaqContent>
  }

  deleteFaqContent(id: number) {
    //Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0YWRtQGVtYWlsLnJvIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg3NTEzNzgyLCJpYXQiOjE2ODc1MDc3ODJ9.5R6d4y1_ZG_cudFojLYVV29kcDrETLKkFznq7lsHBzo
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
    return this.http.delete(`${this.envService.backendAddress}/faq?id=${id}`, {}) as Observable<{}>
  }


}
