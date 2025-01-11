import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RequestUser } from '../models/request-user';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class RequestHrService{
  constructor(private http: HttpClient, private envService: EnvService) { }

  getAllRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>(`${this.envService.backendAddress}/request/allRequests`);
  }

  getAllPendingRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>(`${this.envService.backendAddress}/request/allInPendingRequests`);
  }

  getAllDeniedRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>(`${this.envService.backendAddress}/request/allDeniedRequests`);
  }

  getAllApprovedRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>(`${this.envService.backendAddress}/request/allApprovedRequests`);
  }

  getAllRequestsByUser(): Observable<RequestUser[]>{
    return this.http.get<RequestUser[]>(`${this.envService.backendAddress}/request/allRequestsByUser`);
  }

  denyRequest(id?: number): Observable<any> {
    return this.http.post(`${this.envService.backendAddress}/request/respond-to-request?requestId=${id}&isApproved=false`,{});  
  }

  approveRequest(id?: number): Observable<any> {
    return this.http.post(`${this.envService.backendAddress}/request/respond-to-request?requestId=${id}&isApproved=true`,{}); 
  }

  addRequest(type:string,details:string): Observable<RequestUser>{
    return this.http.put<RequestUser>(`${this.envService.backendAddress}/request/add`,{type,details});
  }

}
