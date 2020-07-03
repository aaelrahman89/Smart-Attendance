

import { Injectable } from '@angular/core';
import { baseService } from '../../genericService/baseService.service';
import { FacultyMemberDTO } from './../../../models/admin/FacultyMember/FacultyMemberDTO';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FacultyMemberFilterModel } from './../../../models/admin/FacultyMember/FacultyMemberFilterModel';


@Injectable({
  providedIn: 'root'
})
export class FacultyMemberService extends baseService<FacultyMemberDTO, number,FacultyMemberFilterModel>  {

  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.baseUrl}${`FacultyMember/`}`) 
  }

  
}
