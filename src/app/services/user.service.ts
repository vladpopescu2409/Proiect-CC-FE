import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address, IdentityCard, LoginDetails, User } from '../models/user';
import { EnvService } from './env.service';

// Acest serviciu tine locul API-ului de backend

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private envService: EnvService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.envService.backendAddress}/user/all`);
  }

  getUserSelf(): Observable<User> {
    return this.http.get<User>(`${this.envService.backendAddress}/user/self`);
  }

  addUser(user: User, loginDetails: LoginDetails, address: Address, identityCard: IdentityCard): Observable<User> {
    return this.http.put<User>(`${this.envService.backendAddress}/user`, { user, loginDetails, address, identityCard });
  }

  updateUser(user: User, loginDetails: LoginDetails, address: Address, identityCard: IdentityCard): Observable<User> {
    return this.http.put<User>(`${this.envService.backendAddress}/user`, { user, loginDetails, address, identityCard });
  }

  updatePhoneNumber(phoneNumber?: string): Observable<User> {
    return this.http.post<User>(`${this.envService.backendAddress}/user/self`, { phoneNumber });
  }

  updatePassword(password?: string): Observable<User> {
    return this.http.post<User>(`${this.envService.backendAddress}/user/self`, { password });
  }

  uploadProfilePicture(image: File): Observable<User> {
    const formData = new FormData();
    formData.append('image', image, image.name);


    // // afiseaza body ul request-ului
    // const result: { [key: string]: string | number | File } = {};
    // formData.forEach((value, key) => {
    //   if (value instanceof File) {
    //     result[key] = value;
    //   } else {
    //     result[key] = key === 'image' ? +value : value;
    //   }
    // });
    // console.log(result);


    return this.http.post<User>(`${this.envService.backendAddress}/user/upload-image`, formData);
  }

  getProfilePicture(): Observable<Blob> {
    return this.http.get(`${this.envService.backendAddress}/user/get-image`, { responseType: 'blob' });
  }
  // { responseType: 'blob' } is specified. This tells the HttpClient to expect the response to be of type Blob. The responseType property is set to 'blob' to ensure that the response is treated as binary data.
  


  deleteUser(id: number): Observable<{}> {
    return this.http.delete(`${this.envService.backendAddress}/user?id=${id}`, {}) as Observable<{}>
  }



  // Am folosit un JWT Token fals, pe care il transmiteam o data cu cererea de login cu scopul de a il primii inapoi, astfel simuland comportamentul backend-ului. acesta il vom inlocuii cu cel generat real in momentul implementarii backend-ului

  // FAKE_JWT_TOKEN_ADMIN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtYWRtaW4tdXNlciIsImRlcGFydG1lbnQiOiIiLCJqb2ItdGl0bGUiOiIiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAaHJjb25uZWN0LmNvbSIsInBob25lIjoiMDc4OTk3NjY3NSJ9.q-OrGYqHFoRLVO3d_-wgpu9lnOlO9p_3g6-Rh0-JULM";

  // FAKE_JWT_TOKEN_HR = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtaHItdXNlciIsImRlcGFydG1lbnQiOiJQQkciLCJqb2ItdGl0bGUiOiJIZWFkIG9mIEhSIiwicm9sZSI6ImhyIiwibmFtZSI6IkFsaWNlIFdvbmRlcmxhbmQiLCJlbWFpbCI6ImFsaWNld29uZGVybGFuZEBocmNvbm5lY3QuY29tIiwicGhvbmUiOiIwNzY2NTU2NjY0In0.YvsdyHGVV3VHw9IuKeObhWiSh_3k3k4YzKGcEAX_0F4";

  // FAKE_JWT_TOKEN_EMPLOYEE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtaHItdXNlciIsImRlcGFydG1lbnQiOiJQQkciLCJqb2ItdGl0bGUiOiJIZWFkIG9mIEZyb250ZW5kIGRlcGFydG1lbnQiLCJyb2xlIjoiZW1wbG95ZWUiLCJuYW1lIjoiSWJyaWFuIE1paGFpLVJhenZhbiIsImVtYWlsIjoiaWJyaWFubWloYWlyYXp2YW5AaHJjb25uZWN0LmNvbSIsInBob25lIjoiMDczNTQ2ODU0MyJ9.WML5RoWN-AhDuAoXHlkFNsbfnWpToGCl89RQxRmt5Ec";

  login(email: any, password: any) {

    // aici se schimba atribuirea in functie de ce categorie de utilizatori vrei sa simulezi log in ul
    // const token = this.FAKE_JWT_TOKEN_ADMIN; 
    // Functia de login era un request de tip post la server, care transmitea e-mail,password si token, astfel incat response-ul sa fie un JSON cu cele 3, cu scopul ca noi sa preluam token-ul din response.

    // Acum ca am implementat backend-ul transmitem doar e-amil si password si vom primii token-ul direct din backend
    return this.http.post(`${this.envService.authAddress}/auth/login`, { email, password });
  }
}
