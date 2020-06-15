import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector : Injector) { }

  intercept (req, next) {

    let loginService = this._injector.get(LoginService);
    let tokenizedReq = req.clone({

      setHeaders: {

        'x-auth': `${loginService.getToken()}`

      }

    })

    return next.handle (tokenizedReq);

  }
}
