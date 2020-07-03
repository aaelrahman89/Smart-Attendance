import { Injectable } from '@angular/core';
import { baseService } from '../../genericService/baseService.service';
import {AdminDashboardDTO} from './../../../models/admin/dashboard/admin-dashboard-dto'
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService extends  baseService<AdminDashboardDTO, number,FilterModel>{

  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.baseUrl}${`Dashboard/GetAdminDashboard/`}`) 
  }
}
