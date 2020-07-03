import { Injectable } from '@angular/core';
import { baseService } from '../../genericService/baseService.service';
import { LectureTypeDTO } from 'src/app/models/admin/LectureType/LectureTypeDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LectureTypeService extends baseService<LectureTypeDTO,number,null>


 {
// tslint:disable-next-line: variable-name
constructor(protected _http: HttpClient) {
  super(_http, `${environment.baseUrl}${`LectureType/`}`);
}
}