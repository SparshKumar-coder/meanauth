import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // This is the registration URL
  private _registerUrl = "http://localhost/user/register";

  constructor(private http: HttpClient) { }

  RegisterUser (body) {

    // console.log (`Registering user with BODY = ${JSON.stringify (body, undefined, 2)}`);
    return this.http.post<any>(this._registerUrl, body);

  }

}
