import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { FilterModel } from '../models/commonModels/FilterModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AttendanceStatusDTO } from '../models/AttendanceStudents/AttendanceStatusDTO';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class attendanceStatusService extends baseService<AttendanceStatusDTO, number, FilterModel> {

  constructor(protected _http: HttpClient) {
      super(_http, `${environment.baseUrl}${`AttendanceStatus/`}`)
  }




}
