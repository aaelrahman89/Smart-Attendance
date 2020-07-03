import { AttendanceStudentsFilterModel } from './../models/AttendanceStudents/AttendanceStudentsFilterModel';
import { AttendanceStudentsDTO } from './../models/AttendanceStudents/AttendanceStudentsDTO';


import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResultForDatatTableDTO } from '../models/CommonModels/IResultForDatatTableDTO';
import { Observable } from 'rxjs';
import { ResultSaveGeneric } from '../models/CommonModels/ResultSaveGeneric';
import { AttendanceStudentsDataDTO } from '../models/AttendanceStudents/AttendanceStudentsUpdateDTO';
import { AttendanceForLectureDTO } from '../models/AttendanceStudents/AttendanceForLectureDTO';
import { AttendStudentsByFaculityMemberDTO } from '../models/AttendanceStudents/AttendStudentsByFaculityMemberDTO';
import { FilterAttendanceForStudentsDTO } from '../models/AttendanceStudents/FilterAttendanceForStudentsDTO';
import { AttendanceForStudentsDTO } from '../models/AttendanceStudents/AttendanceForStudentsDTO';
import { AttendanceForStudentDTO } from '../models/AttendanceStudents/AttendanceForStudentDTO';

@Injectable({
  providedIn: 'root'
})
export class FilterAttendanceStudentsService extends baseService<AttendanceStudentsDTO, number, AttendanceStudentsFilterModel>  {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Attendance/`}`)
}

FilterAttendance(filter:AttendanceStudentsFilterModel): Observable<AttendanceStudentsDTO> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.post<AttendanceStudentsDTO>(`${this.myURL}${'FilterAttendanceStudents'}`,filter);
}

FilterAfterTimer(filter:AttendanceStudentsFilterModel): Observable<IResultForDatatTableDTO<any>> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.post<IResultForDatatTableDTO<any>>(`${this.myURL}${'Filter'}`,filter);
}

getAttendanceForLecture(filter:FilterAttendanceForStudentsDTO): Observable<AttendanceForLectureDTO> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.post<AttendanceForLectureDTO>(`${this.myURL}${'GetAttendanceForLecture'}`,filter);
}


deleteAttendanceStudents(lecture, lectures): Observable<AttendanceForLectureDTO> {
  console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.delete<AttendanceForLectureDTO>(`${this.myURL}${'DeleteAttendanceStudents'}?date=${lecture.Date}&CRN=${lectures.CRN}&day=${lecture.Day}&locationCode=${lecture.AttendanceLocationCode}&termCode=${lectures.TermCode}&startTime=${lecture.StartTime}&endTime=${lecture.EndTime}`);
}

/*
GetTaskDetailsByID(ID): Observable<AttendanceForLectureDTO> {
  // console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.get<AttendanceForLectureDTO>(`${this.myURL}${'RequestTask/GetTaskDetails'}?TaskId=${ID}`);
}
*/

getAttendanceForStudents(filter:FilterAttendanceForStudentsDTO): Observable<AttendanceForStudentsDTO> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.post<AttendanceForStudentsDTO>(`${this.myURL}${'GetAttendanceForStudents'}`,filter);
}


getByIDAttendanceForStudents(filter:FilterAttendanceForStudentsDTO): Observable<AttendanceForStudentDTO> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.post<AttendanceForStudentDTO>(`${this.myURL}${'GetAttendanceForStudent'}`,filter);
}


UpdateAttendance(model: AttendStudentsByFaculityMemberDTO[]): Observable<ResultSaveGeneric<any>> {
  console.log(`hi you are now in way to Update to ${this.myURL}`);
  return this.httpClient.put<ResultSaveGeneric<AttendanceStudentsDataDTO>>
      (`${this.myURL}${'AttendStudentsByFaculityMember'}`, model);
}



}
