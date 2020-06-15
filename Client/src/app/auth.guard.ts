import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private _loginService : LoginService, private _router : Router) {} 

  canActivate(): boolean {

    if (this._loginService.LoggedIn()) {
      return true;
    }
    else {
      this._router.navigate (['/login']);
      return false;
    }

  }
  
}
