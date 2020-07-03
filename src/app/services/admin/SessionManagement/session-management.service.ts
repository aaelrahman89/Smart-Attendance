import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { SessionManagementDTOFilterModel } from 'src/app/models/admin/SessionManagementDTO/SessionManagementDTOFilterModel';
import { baseService } from '../../genericService/baseService.service';
import { SessionManagementDTO } from 'src/app/models/admin/SessionManagementDTO/SessionManagementDTO';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService extends baseService<SessionManagementDTO,number,SessionManagementDTOFilterModel> {
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Section/`}`);
  }
}


