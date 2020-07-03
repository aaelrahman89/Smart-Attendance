import { Injectable } from '@angular/core';
import { StudentAdminDTO } from 'src/app/models/admin/StudentAdmin/StudentAdminDTO';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { baseService } from '../../genericService/baseService.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentRelativeRelationService extends baseService<StudentAdminDTO, number, FilterModel> {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`StudentRelativeRelation/`}`);
  }

}
