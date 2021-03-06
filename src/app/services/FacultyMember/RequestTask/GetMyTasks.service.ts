import { GetMyTasksDTO } from './../../../models/FacultyMemberModal/RequestTask/GetMyTasksDTO';
import { GetMyTasksFilterModel } from './../../../models/FacultyMemberModal/RequestTask/GetMyTasksFilterModel';






import { Injectable } from '@angular/core';
import { baseService } from '../../genericService/baseService.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostTaskDTO } from 'src/app/models/FacultyMemberModal/RequestTask/PostTaskDTO';
import { GetTaskDetailsDTO } from 'src/app/models/FacultyMemberModal/RequestTask/GetTaskDetailsDTO';
import { GetPermissionDTO } from 'src/app/models/FacultyMemberModal/RequestTask/GetPermissionDTO';



@Injectable({
  providedIn: 'root'
})
export class GetMyTasksservice extends baseService<GetMyTasksDTO, number,GetMyTasksFilterModel>  {

  constructor(protected _http: HttpClient) { 
    super(_http, `${environment.baseUrl}${`RequestTask/`}`) 
  }

  GetTaskDetailsByID(Id): Observable<GetTaskDetailsDTO> {
    // console.log(`hi you are now in way to Delete for ${this.myURL}`);
    return this.httpClient.get<GetTaskDetailsDTO>(`${this.myURL}${'GetMedicalExcuseTaskDetails'}?TaskId=${Id}`);
  
}

MedicalExcuseDetails(Id): Observable<GetTaskDetailsDTO> {
  // console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.get<GetTaskDetailsDTO>(`${this.myURL}${'GetPreviousMedicalExcuses'}?CurrentTaskId=${Id}`);

}

GetPermissionTaskDetails(Id): Observable<GetPermissionDTO> {
  // console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.get<GetPermissionDTO>(`${this.myURL}${'GetPermissionTaskDetails'}?TaskId=${Id}`);

}

GetPreviousPermission(Id): Observable<GetPermissionDTO> {
  // console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.get<GetPermissionDTO>(`${this.myURL}${'GetPreviousPermission'}?CurrentTaskId=${Id}`);

}
 

GetTaskAll(isCompleted): Observable<GetMyTasksDTO> {
  console.log(`hi you are now in way to GetAll for ${this.myURL}`);
  return this.httpClient.get<GetMyTasksDTO>(`${this.myURL}${'GetMyTasks'}?isCompleted=${isCompleted}`);
}





PostTask(model: PostTaskDTO[]): Observable<PostTaskDTO> {
  // console.log(`hi you are now in way to Delete for ${this.myURL}`);
  return this.httpClient.post<PostTaskDTO>(`${this.myURL}${'SaveTask'}`, model);

}

}



