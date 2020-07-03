import { LectureScheduleDTO } from './../../../models/admin/LectureSchedule/LectureScheduleDTO';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { IResultForDatatTableDTO } from 'src/app/models/CommonModels/IResultForDatatTableDTO';
import { Observable } from 'rxjs';
import { CRUD_ServiceDTO } from 'src/app/models/CommonModels/CRUD-ServiceDTO';

@Injectable({
  providedIn: 'root'
})
export class LectureScheduleService extends baseService<LectureScheduleDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`LectureSchedule/`}`);
  }

  // FilterForAttendance
  FilterForAttendance(filter:FilterModel): Observable<IResultForDatatTableDTO<LectureScheduleDTO>> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.post<IResultForDatatTableDTO<LectureScheduleDTO>>(`${this.myURL}${'FilterForAttendance'}`,filter);
  }

  // FilterForFacultyMember
  FilterForFacultyMember(filter:FilterModel): Observable<IResultForDatatTableDTO<LectureScheduleDTO>> {
    console.log(`hi you are now in way to GetAll by FilterForFacultyMember for ${this.myURL}`);
    return this.httpClient.post<IResultForDatatTableDTO<LectureScheduleDTO>>(`${this.myURL}${'FilterForFacultyMember'}`,filter);
  }

  

}






