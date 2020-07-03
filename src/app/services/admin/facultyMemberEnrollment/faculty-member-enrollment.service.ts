import { FacultyMemberEnrollmentDTO } from './../../../models/admin/FacultyMemberEnrollment/FacultyMemberEnrollmentDTO';
import { Injectable } from '@angular/core';


import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyMemberEnrollmentService extends baseService<FacultyMemberEnrollmentDTO, number, FilterModel> {

  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.baseUrl}${`FacultyMemberEnrollment/`}`) 
  }
}
