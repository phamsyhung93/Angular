import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "./user";
import { environment } from "../environments/environment";


const baseUrl = `${environment.apiUrl}/gateway/gallery/api/v1/employees`;


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl, { responseType: 'json' });
  }
}
