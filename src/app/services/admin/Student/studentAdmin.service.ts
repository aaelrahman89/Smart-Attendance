import { StudentAdminFilterModel } from '../../../models/admin/StudentAdmin/StudentAdminFilterModel';
import { StudentAdminDTO } from '../../../models/admin/StudentAdmin/StudentAdminDTO';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { baseService } from '../../genericService/baseService.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAdminService extends baseService<StudentAdminDTO, number, StudentAdminFilterModel> {


  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Student/`}`)
}


}
