import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {


  public _logoutURL = "http://localhost/logout";


  constructor(private http: HttpClient) { }

  LogoutUser () {

    return this.http.get<any>(this._logoutURL)

  }

}
