import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { FilterModel } from '../models/commonModels/FilterModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CollegeDTO } from '../models/CollegeDTO';

@Injectable({
  providedIn: 'root'
})
export class CollegeService extends baseService<CollegeDTO, number, FilterModel> {

  constructor(protected _http: HttpClient) {
      super(_http, `${environment.baseUrl}${`College/`}`)
  }

}
