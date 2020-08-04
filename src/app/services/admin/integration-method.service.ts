import { Injectable } from '@angular/core';
import { baseService } from '../genericService/baseService.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { IntegrationMetodDTO } from 'src/app/models/admin/integration-metod-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationMethodService extends baseService<IntegrationMetodDTO, number, FilterModel>{

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`IntegrationMethod/`}`);
  }

  GetIntegrationMethodServices(): Observable<IntegrationMetodDTO> {
    console.log(`hi you are now in way to GetAll for ${this.myURL}`);
    return this.httpClient.get<IntegrationMetodDTO>(`${this.myURL}GetIntegrationMethodServices`);
  }


  // UpdateIntegrationMethodService(): Observable<IntegrationMetodDTO[]> {
  //   console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  //   return this.httpClient.get<IntegrationMetodDTO[]>(`${this.myURL}UpdateIntegrationMethodService`);
  // }



}
