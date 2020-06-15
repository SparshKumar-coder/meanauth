

import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService : LoginService, private _router : Router) { }

  public errors = "";

  public FormInputs = [

    { label: "Email", type: "email", placeholder:"Enter Email here", value: "" },
    { label: "Password", type: "password", placeholder: "Enter Password here", value: ""}

  ]

  ngOnInit(): void {

    let token = localStorage.getItem ('token');
    
    if (token) {
      this._router.navigate(['/dashboard']);
    }

  }

  SubmitLogin () {

    const email = this.FormInputs[0].value;
    const password = this.FormInputs[1].value;
    const body = {
      email,
      password
    }

    this._loginService.LoginUser (body)
        .subscribe ((response) => {

          console.log (`Response = ${JSON.stringify(response, undefined, 2)}`);
          localStorage.setItem ('token', response.updatedDoc.tokens[0].token);
          this._router.navigate (['/dashboard']);

        }, (error) => {

          this.errors = error.error.message;
          console.log (`ERROR = ${JSON.stringify(error, undefined, 2)}`);

        })

  }

}
