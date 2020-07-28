
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { Observable } from 'rxjs';
import { SystemConfigurationDTO } from 'src/app/models/admin/SystemConfiguration/SystemConfigurationDTO';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService extends baseService<SystemConfigurationDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`SystemSetting/`}`);
  }

  GetSystemSetting(): Observable<SystemConfigurationDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<SystemConfigurationDTO>(`${this.myURL}GetSystemSetting`);
  }


  save(model: SystemConfigurationDTO): Observable<any> {
    console.log(`hi you are now in way to Insert to ${this.myURL}`, model);
    return this.httpClient.post<any>
        (`${this.myURL}SaveSystemSetting`, model);
  }




}






