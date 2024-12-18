import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RequestUser } from '../models/request-user';

@Injectable({
  providedIn: 'root'
})
export class RequestHrService{
  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allRequests');
  }

  getAllPendingRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allInPendingRequests');
  }

  getAllDeniedRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allDeniedRequests');
  }

  getAllApprovedRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allApprovedRequests');
  }

  getAllRequestsByUser(): Observable<RequestUser[]>{
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allRequestsByUser');
  }

  denyRequest(id?: number): Observable<any> {
    return this.http.post(`http://localhost:8082/request/respond-to-request?requestId=${id}&isApproved=false`,{});  
  }

  approveRequest(id?: number): Observable<any> {
    return this.http.post(`http://localhost:8082/request/respond-to-request?requestId=${id}&isApproved=true`,{}); 
  }

  addRequest(type:string,details:string): Observable<RequestUser>{
    return this.http.put<RequestUser>('http://localhost:8082/request/add',{type,details});
  }

}
