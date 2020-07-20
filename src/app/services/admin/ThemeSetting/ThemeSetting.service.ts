import { baseService } from '../../genericService/baseService.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ThemeSettingDTO } from 'src/app/models/admin/ThemeSetting/ThemeSettingDTO';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
  })
  export class ThemeSettingservice extends baseService<ThemeSettingDTO, number,any>  {
  
    constructor(protected _http: HttpClient) { 
      super(_http, `${environment.baseUrl}${`ThemeSetting/`}`) 
    }




    GetTheme(): Observable<ThemeSettingDTO> {
        console.log(`hi you are now in way to GetAll for ${this.myURL}`);
        return this.httpClient.get<ThemeSettingDTO>(`${this.myURL}${'GetThemeSetting'}`);
      }
      
      
PostTheme(model: ThemeSettingDTO[]): Observable<ThemeSettingDTO> {
    // console.log(`hi you are now in way to Delete for ${this.myURL}`);
    return this.httpClient.post<ThemeSettingDTO>(`${this.myURL}${'SaveThemeSetting'}`, model);
  
  }

}
