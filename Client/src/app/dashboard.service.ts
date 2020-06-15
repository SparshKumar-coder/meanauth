import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  private _dashboardURL = "http://localhost/dashboard";


  constructor(private http: HttpClient) { }

  getDashBoardData () {

    return this.http.get<any>(this._dashboardURL);

  }

}
