import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { IGetAllCategoriesResponse } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

getAllCategories(): Observable<IGetAllCategoriesResponse[]>{
  return this.http.get<IGetAllCategoriesResponse[]>(`${this.API_URL}/categories`, this.httpOptions);
}
}
