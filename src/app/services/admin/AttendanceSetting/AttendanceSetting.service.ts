import { GetByCollegeCodeDTO } from './../../../models/admin/AttendanceSetting/GetByCollegeCodeDTO';


import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { IResultForDatatTableDTO } from 'src/app/models/CommonModels/IResultForDatatTableDTO';
import { Observable } from 'rxjs';
import { CRUD_ServiceDTO } from 'src/app/models/CommonModels/CRUD-ServiceDTO';
import { AttendanceSettingDTO } from 'src/app/models/admin/AttendanceSetting/AttendanceSettingDTO';
import { AvailableCollegesDTO } from 'src/app/models/admin/AttendanceSetting/AvailableCollegesDTO';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSettingService extends baseService<AttendanceSettingDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`AttendanceSetting/`}`);
  }

  GetAvailableCollegesForAttendanceSetting(): Observable<AvailableCollegesDTO[]> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<AvailableCollegesDTO[]>(`${this.myURL}GetAvailableCollegesForAttendanceSetting`);
  }

  GetByCollegeCode(collegeCode?): Observable<GetByCollegeCodeDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<GetByCollegeCodeDTO>(`${this.myURL}GetByCollegeCode?collegeCode=${collegeCode}`);
  }

  save(model: GetByCollegeCodeDTO): Observable<GetByCollegeCodeDTO> {
    console.log(`hi you are now in way to Insert to ${this.myURL}`, model);
    return this.httpClient.post<GetByCollegeCodeDTO>
        (`${this.myURL}Save`, model);
  }

  // FilterForAttendance
  // FilterForAttendance(filter:FilterModel): Observable<IResultForDatatTableDTO<LectureScheduleDTO>> {
  //   console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  //   return this.httpClient.post<IResultForDatatTableDTO<LectureScheduleDTO>>(`${this.myURL}${'FilterForAttendance'}`,filter);
  // }



}






