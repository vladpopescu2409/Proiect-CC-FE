import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormService {

  constructor(private http: HttpClient, private envService: EnvService) { }
  getFeedback() {
  
    return this.http.get(`${this.envService.backendAddress}/feedback/all`) as Observable<Feedback[]>
    
  }

  getFeedbackById(id: number) {
    return this.http.get(`${this.envService.backendAddress}/feedbacks/${id}`) as Observable<Feedback>
  }

  addFeedback(postObject: Feedback) {
    return this.http.put(`${this.envService.backendAddress}/feedback`, postObject) as Observable<Feedback>
  }

  updateFeedback(postObject: Feedback) {
    
    return this.http.post<any>(`${this.envService.backendAddress}/feedback/fav?id=${postObject.id}`, "") as Observable<any>
  }

  deleteFeedback(id: number) {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
    return this.http.delete(`${this.envService.backendAddress}/feedback?id=${id}`) as Observable<{}>
  }

}
