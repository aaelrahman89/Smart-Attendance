import { Injectable } from '@angular/core';
import { baseService } from '../../genericService/baseService.service';
import { FilterModel } from './../../../models/commonModels/FilterModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CurrentTermDTO } from './../../../models/term/CurrentTermDTO';


@Injectable({
  providedIn: 'root',
})
export class CurrentTermService extends baseService<CurrentTermDTO, number, FilterModel> {
  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Term/GetCurrentTerm/`}`);
  }
}

//
