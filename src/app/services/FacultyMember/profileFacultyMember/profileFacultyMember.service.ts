import { profileFacultyMemberConfCodeDTO } from './../../../models/FacultyMemberModal/profileFacultyMember/profileFacultyMemberConfCodeDTO';
import { profileFacultyMemberDTO } from './../../../models/FacultyMemberModal/profileFacultyMember/profileFacultyMemberDTO';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class profileFacultyMemberservice extends baseService<profileFacultyMemberDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`FacultyMember/`}`);
  }




  GetFacultymemberProfile(): Observable<profileFacultyMemberDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<profileFacultyMemberDTO>(`${this.myURL}${'GetFacultymemberProfile'}`);
  }



  GetSmsOrMailConfCodeMObile(Boolean): Observable<profileFacultyMemberDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);

  return this.httpClient.get<profileFacultyMemberDTO>(`${this.myURL}${'GetSmsOrMailConfCode'}?isSms=${Boolean}`);

  }
  
  PostprofileFacultyMember(model: profileFacultyMemberConfCodeDTO[]): Observable<profileFacultyMemberConfCodeDTO> {
    // console.log(`hi you are now in way to Delete for ${this.myURL}`);
    return this.httpClient.post<profileFacultyMemberConfCodeDTO>(`${this.myURL}${'IsSmsOrMailConfCode'}`, model);
  
  }




}






