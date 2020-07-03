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

@Injectable({
  providedIn: 'root'
})
export class StudentStatusSettingService extends baseService<AttendanceSettingDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`StudentStatusSetting/`}`);
  }

  GetAvailableCollegesForStudentStatusSetting(): Observable<GetAvailableCollegesForStudentStatusSettingDTO[]> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}GetAvailableCollegesForStudentStatusSetting`);
    return this.httpClient.get<GetAvailableCollegesForStudentStatusSettingDTO[]>(`${this.myURL}GetAvailableCollegesForStudentStatusSetting`);
  }

  GetByCollegeCode(collegeCode): Observable<GetByCollegeCodeForStudentStatusSettingDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}GetByCollegeCode?collegeCode=${collegeCode}`);
    return this.httpClient.get<GetByCollegeCodeForStudentStatusSettingDTO>(`${this.myURL}GetByCollegeCode?collegeCode=${collegeCode}`);
  }

  // save(model: GetByCollegeCodeDTO): Observable<GetByCollegeCodeDTO> {
  //   console.log(`hi you are now in way to Insert to ${this.myURL}`, model);
  //   return this.httpClient.post<GetByCollegeCodeDTO>
  //       (`${this.myURL}Save`, model);
  // }



}






