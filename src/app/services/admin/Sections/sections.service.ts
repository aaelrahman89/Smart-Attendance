import { Injectable } from '@angular/core';
import { baseService } from './../../genericService/baseService.service';
import { SectionsFilterModel } from '../../../models/admin/Sections/SectionsFilterModel';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SectionsDTO } from '../../../models/admin/Sections/SectionsDTO';
@Injectable({
  providedIn: 'root',
})
export class SectionsService extends baseService<
  SectionsDTO,
  number,
  SectionsFilterModel
> {
  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Section/`}`);
  }
}
