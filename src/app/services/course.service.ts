import { CourseFilterModel } from 'src/app/models/Course/CourseFilterModel';
import { Injectable } from '@angular/core';
import { baseService } from './genericService/baseService.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CourseDTO } from '../models/Course/CourseDTO';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends baseService<CourseDTO, number, CourseFilterModel>  {

  constructor(protected _http: HttpClient) {
    super(_http, `${environment.baseUrl}${`Course/`}`)
}

}
