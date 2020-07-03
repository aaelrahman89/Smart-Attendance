import { Component, OnInit, ɵConsole } from '@angular/core';
import { AdminDashboardService } from 'src/app/services/admin/dashboard/admin-dashboard.service';
import {AdminDashboardDTO} from 'src/app/models/admin/dashboard/admin-dashboard-dto'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public  AdminDashboardService: AdminDashboardService) { }

  dashboard

  ngOnInit(): void {

this.AdminDashboardService.GetAll().subscribe( res => {
this.dashboard = res
})

  }

}
