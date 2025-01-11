import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormService {

  constructor(private http: HttpClient) { }
  getFeedback() {
  
    return this.http.get('http://localhost:8082/feedback/all') as Observable<Feedback[]>
    
  }

  getFeedbackById(id: number) {
    return this.http.get(`http://localhost:4300/feedbacks/${id}`) as Observable<Feedback>
  }

  addFeedback(postObject: Feedback) {
    return this.http.put('http://localhost:8082/feedback', postObject) as Observable<Feedback>
  }

  updateFeedback(postObject: Feedback) {
    
    return this.http.post<any>(`http://localhost:8082/feedback/fav?id=${postObject.id}`, "") as Observable<any>
  }

  deleteFeedback(id: number) {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
    return this.http.delete(`http://localhost:8082/feedback?id=${id}`) as Observable<{}>
  }

}
