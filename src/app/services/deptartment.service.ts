import { DeptartmentDTO } from '../models/Department/DeptartmentDTO';
import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { FilterModel } from '../models/commonModels/FilterModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DepartmentFilterModel } from '../models/Department/DepartmentFilterModel';

@Injectable({
  providedIn: 'root'
})
export class DeptartmentService extends baseService<DeptartmentDTO, number, DepartmentFilterModel>  {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Department/`}`)
}

}
