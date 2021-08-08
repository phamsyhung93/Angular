import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = 'http://localhost:8762/gateway/auth';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-type' : 'application/json'}),
    observe: "response" as 'body'
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  //credentials;
  //credentials.username,
  //credentials.password
  login(): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        "username" : "admin",
        "password" : "12345"
      },
      httpOptions
    );
  }

//   register(user): Observable<any> {
//     return this.http.post(
//       AUTH_API,
//       {
//         username: user.username,
//         password: user.password,
//         email: user.email,
//       },
//       httpOptions
//     );
//   }
}