import { MajorFilterModel } from './../models/Major/MajorFilterModel';
import { MajorDTO } from './../models/Major/MajorDTO';
import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MajorService extends baseService<
  MajorDTO,
  number,
  MajorFilterModel
> {
  // tslint:disable-next-line: variable-name
  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Major/`}`);
  }
}
