import { Injectable } from '@angular/core';
import { FilterModel } from '../models/commonModels/FilterModel';
import { LoginDTO } from '../models/LoginDTO';
import { baseService } from './genericService/baseService.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends baseService<LoginDTO, number, FilterModel>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Authentication/GenerateToken/`}`)
}


}
