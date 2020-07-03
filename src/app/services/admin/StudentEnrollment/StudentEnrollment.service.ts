import { StudentEnrollmentFilterModel } from './../../../models/admin/StudentEnrollment/StudentEnrollmentFilterModel';
import { StudentEnrollmentDTO } from './../../../models/admin/StudentEnrollment/StudentEnrollmentDTO';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';


@Injectable({
  providedIn: 'root'
})
export class StudentEnrollmentservice extends baseService<StudentEnrollmentDTO, number, StudentEnrollmentFilterModel> {


  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`StudentEnrollment/`}`)
}


}