import { GetByCollegeCodeDTO } from './../../../models/admin/AttendanceSetting/GetByCollegeCodeDTO';


import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { Observable } from 'rxjs';
import { AttendanceSettingDTO } from 'src/app/models/admin/AttendanceSetting/AttendanceSettingDTO';
import { GetByCollegeCodeForStudentStatusSettingDTO } from 'src/app/models/admin/StudentStatusSetting/GetByCollegeCodeForStudentStatusSettingDTO';
import { GetAvailableCollegesForStudentStatusSettingDTO } from 'src/app/models/admin/StudentStatusSetting/GetAvailableCollegesForStudentStatusSettingDTO';
import { LiftAbsenceSettingDTO } from 'src/app/models/admin/LiftAbsenceSetting/LiftAbsenceSettingDTO';

@Injectable({
  providedIn: 'root'
})
export class LiftAbsenceSettingService extends baseService<LiftAbsenceSettingDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`LiftAbsenceSetting/`}`);
  }

  GetAvailableCollegesForLiftAbsenceSetting(): Observable<LiftAbsenceSettingDTO[]> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}GetAvailableCollegesForLiftAbsenceSetting`);
    return this.httpClient.get<LiftAbsenceSettingDTO[]>(`${this.myURL}GetAvailableCollegesForLiftAbsenceSetting`);
  }

  // GetByCollegeCode(collegeCode): Observable<GetByCollegeCodeForStudentStatusSettingDTO> {
  //   console.log(`hi you are now in way to GetAll for ${this.myURL}GetByCollegeCode?collegeCode=${collegeCode}`);
  //   return this.httpClient.get<GetByCollegeCodeForStudentStatusSettingDTO>(`${this.myURL}GetByCollegeCode?collegeCode=${collegeCode}`);
  // }

  Save(model: LiftAbsenceSettingDTO): Observable<any> {
    console.log(`hi you are now in way to Insert to ${this.myURL}`, model);
    return this.httpClient.post<any>
        (`${this.myURL}Save`, model);
  }

  IsActive(CollegeCode: string): Observable<any> {
    console.log(`hi you are now in way to Insert to ${this.myURL}`);
    return this.httpClient.post<any>
        (`${this.myURL}IsActive?CollegeCode=${CollegeCode}`, null);
  }

  DeleteLiftAbsence(CollegeCode: string): Observable<any> {
    console.log(`hi you are now in way to Delete to ${this.myURL}`);
    return this.httpClient.delete<any>
        (`${this.myURL}DeleteLiftAbsence?CollegeCode=${CollegeCode}`);
  }



}






