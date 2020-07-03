import { ScheduleTypeDTO } from './../../../models/admin/ScheduleType/ScheduleTypeDTO';

import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';


@Injectable({
  providedIn: 'root'
})
export class ScheduleTypeservice extends baseService<ScheduleTypeDTO, number, FilterModel> {

  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`ScheduleType/`}`);
  }
}
