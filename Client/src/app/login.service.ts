import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginUrl = "http://localhost/user/login";
  private _checkloginUrl = "http://localhost/user/logincheck";

  constructor(private http: HttpClient) { }

  LoginUser (body) {

    console.log(body);
    return this.http.post<any>(this._loginUrl, body);

  }

  LoggedIn () {

    return !!localStorage.getItem ('token');

  }

  getToken () {

    return localStorage.getItem ('token');

  }

}
