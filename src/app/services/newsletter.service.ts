import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { NewsletterArticle } from '../models/newsletter-article';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient, private envService: EnvService) {
  }

  // getNewsletterArticles() {
  //   // const headers = new HttpHeaders();
  //   //   headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
  //   return this.http.get('http://localhost:8082/article/all') as Observable<NewsletterArticle[]>
  // }

 
  getNewsletterArticles(): Observable<NewsletterArticle[]> {
    return this.http.get<NewsletterArticle[]>(`${this.envService.backendAddress}/article/all`)
     
  }
  

  getNewsletterArticleById(id: number) {
    return this.http.get(`${this.envService.backendAddress}/article/get-article?id=${id}`) as Observable<NewsletterArticle>
  }

  addNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post(`${this.envService.backendAddress}/article`, postObject) as Observable<NewsletterArticle>
  }


  uploadCoverImage(image: File,id:number): Observable<NewsletterArticle> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('id',id.toString());


    // afiseaza body ul request-ului
    // console.log('UPLOAD COVER IMAGE BODY: ');
    // const result: { [key: string]: string | number | File } = {};
    // formData.forEach((value, key) => {
    //   if (value instanceof File) {
    //     result[key] = value;
    //   } else {
    //     result[key] = key === 'image' ? +value : value;
    //   }
    // });
    // console.log(result);


    return this.http.post<NewsletterArticle>(`${this.envService.backendAddress}/article/upload-image`, formData);
  }

  // getCoverImage(id: number): Observable<Blob> {
  //   return this.http.get(`http://localhost:8082/article/get-image?id=${id}`, { responseType: 'blob' });
  // }

  getCoverImage(id:number): Observable<Blob> {
    return this.http.get(`${this.envService.backendAddress}/article/get-image?id=${id}`, { responseType: 'blob' });
  }

  
  updateNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post(`${this.envService.backendAddress}/article`, postObject) as Observable<NewsletterArticle>
  }

  deleteNewsletterArticle(id: number) {
    const headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
      return this.http.delete(`${this.envService.backendAddress}/article?id=${id}`, {}) as Observable<{}>
  }
}
