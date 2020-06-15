import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../logout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public Error = "";
  constructor(private _logout : LogoutService, private _router : Router) { }

  ngOnInit(): void {

    this._logout.LogoutUser ()
    .subscribe ((response) => {

      console.log (response);
      localStorage.removeItem('token');
      this._router.navigate (['/register']);

    }, (error) => {

      this.Error = error.error.message;

    })

  }

}
