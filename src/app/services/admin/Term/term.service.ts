import { TermDTO } from './../../../models/admin/Term/TermDTO';
import { Injectable } from '@angular/core';
import { TermFilterModel } from 'src/app/models/admin/Term/TermFilterModel';
import { baseService } from '../../genericService/baseService.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TermService extends baseService<TermDTO, number, TermFilterModel> {
  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Term/`}`);
  }
}
