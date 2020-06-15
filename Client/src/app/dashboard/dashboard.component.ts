import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public dashboardData = [];
  public Error = "";
  public Data = "";
  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {

    this._dashboardService.getDashBoardData ()
    .subscribe ((response) => {

      this.Data = JSON.stringify(response, undefined, 2);

    }, (error) => {

      this.Error = error.error.message;

    })

  }

}
