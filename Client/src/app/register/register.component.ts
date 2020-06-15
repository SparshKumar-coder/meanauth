import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _registerService : RegisterService, private _router: Router) { }

  public errors = "";

  public Roles = [

    { name: "admin", isChecked: true, Index: 0 },
    { name: "manager", isChecked: false, Index: 1 },
    { name: "designer", isChecked: false, Index: 2 }

  ];

  public FormInputs = [

    { label: "Email", type: "email", placeholder:"Enter Email here", value: "" },
    { label: "Password", type: "password", placeholder: "Enter Password here", value: "" },
    { label: "Username", type: "text", placeholder: "Enter Username here", value: "" },
    { label: "Company Name", type: "text", placeholder: "Enter Company Name here", value: ""},
    { label: "CompanySubDomainName", type: "text", placeholder: "Enter Company Sub Domain name", value: ""}

  ]

  ngOnInit(): void {
  }

  ChangingCheckBoxState (Index) {

    for (let index = 0;index < this.Roles.length;index = index + 1) {

      if (Index !== index) {

        this.Roles[index].isChecked = false;

      }

    }

  }



  SubmitRegister () {


    // The Register Logic will go here
    
    let role = this.Roles.find ((item) => {

      return item.isChecked

    });


    let email = this.FormInputs[0].value;
    let password = this.FormInputs[1].value;
    let userName = this.FormInputs[2].value;
    let CompanyName = this.FormInputs[3].value;
    let CompanySubDomainName = this.FormInputs[4].value;

    
    const body = {

      email,
      password,
      userName,
      role: role.name,
      CompanyName,
      CompanySubDomainName

    };


    this._registerService.RegisterUser (body)
      .subscribe ((response) => {
        
        console.log (`Response = ${JSON.stringify(response, undefined, 2)}`);
        this._router.navigate(['/login']);

      }, (error) => {

        this.errors = error.error.message;
        console.log (`Error = ${JSON.stringify(error, undefined, 2)}`);

      })

  }



}
