import { AdminProfileIsConfCode } from './../../../models/admin/AdminProfile/AdminProfileIsConfCode';
import { AdminProfileDTO } from '../../../models/admin/AdminProfile/AdminProfileDTO';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AdminProfileservice extends baseService<AdminProfileDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`AdminProfile/`}`);
  }




  GetAdminProfile(): Observable<AdminProfileDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<AdminProfileDTO>(`${this.myURL}${'GetAdminProfile'}`);
  }
  



  GetSmsOrMailConfCodeMObile(Boolean): Observable<AdminProfileDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);

  return this.httpClient.get<AdminProfileDTO>(`${this.myURL}${'GetSmsOrMailConfCode'}?isSms=${Boolean}`);

  }
  
  PostprofileFacultyMember(model: AdminProfileIsConfCode[]): Observable<AdminProfileIsConfCode> {
    // console.log(`hi you are now in way to Delete for ${this.myURL}`);
    return this.httpClient.post<AdminProfileIsConfCode>(`${this.myURL}${'IsSmsOrMailConfCode'}`, model);
  
  }

}






