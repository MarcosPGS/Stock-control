import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { ISignupUserRequest, ISignupUserResponse } from '../models/signupUser';
import { IAuthRequest, IAuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  signupUser(requestData: ISignupUserRequest): Observable<ISignupUserResponse>{
    return this.http.post<ISignupUserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.API_URL}/auth`, requestData);
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookieService.get('USER_INFO');
    return JWT_TOKEN ? true: false;
  }
}
