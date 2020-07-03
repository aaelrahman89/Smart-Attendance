import { CrudOperations } from './crud-operations.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResultForDatatTableDTO } from '../../models/CommonModels/IResultForDatatTableDTO';
import { CRUD_ServiceDTO } from '../../models/CommonModels/CRUD-ServiceDTO';
import { ResultSaveGeneric } from '../../models/CommonModels/ResultSaveGeneric';
import { ResultSaveListGeneric } from '../../models/CommonModels/ResultSaveListGeneric';
import { ResultDeleteDTO } from '../../models/CommonModels/ResultDeleteDTO';

export abstract class baseService<DTO, ID, Filter> implements CrudOperations<DTO, ID, Filter> {

    constructor(
        protected httpClient: HttpClient,
        protected myURL: string
    ) { }

    GetAll(): Observable<IResultForDatatTableDTO<DTO>> {
      console.log(`hi you are now in way to GetAll for ${this.myURL}`);
      return this.httpClient.get<IResultForDatatTableDTO<DTO>>(`${this.myURL}`);
    }

    GetAll2(filter:Filter): Observable<IResultForDatatTableDTO<DTO>> {
        console.log(`hi you are now in way to GetAll for ${this.myURL}`);
        return this.httpClient.post<IResultForDatatTableDTO<DTO>>(`${this.myURL}${CRUD_ServiceDTO.GetAll2}`,filter);
    }
    Filter(filter:Filter): Observable<IResultForDatatTableDTO<DTO>> {
        console.log(`hi you are now in way to GetAll by filter for ${this.myURL}`);
        return this.httpClient.post<IResultForDatatTableDTO<DTO>>(`${this.myURL}${CRUD_ServiceDTO.Filter}`,filter);
    }


    GetById(Id: ID): Observable<DTO> {
        console.log(`hi you are now in way to get data by id ${Id} from ${this.myURL}`, Id);
        return this.httpClient.get<DTO>(`${this.myURL}${CRUD_ServiceDTO.GetById}${Id.toString()}`);
    }

    GetByCode(Id: ID): Observable<DTO> {
        console.log(`hi you are now in way to get data by id ${Id} from ${this.myURL}`, Id);
        return this.httpClient.get<DTO>(`${this.myURL}${CRUD_ServiceDTO.GetByCode}${Id.toString()}`);
    }

    Insert(model: DTO): Observable<ResultSaveGeneric<DTO>> {
        console.log(`hi you are now in way to Insert to ${this.myURL}`, model);
        return this.httpClient.post<ResultSaveGeneric<DTO>>
            (`${this.myURL}${CRUD_ServiceDTO.Insert}`, model);
    }



    Update(model: DTO): Observable<ResultSaveGeneric<DTO>> {
        console.log(`hi you are now in way to Update to ${this.myURL}`, model);
        return this.httpClient.put<ResultSaveGeneric<DTO>>
            (`${this.myURL}${CRUD_ServiceDTO.Update}`, model);
    }


  //   updateElement(element): Observable<any>{
  //     return this.httpClient.put(`${this.myURL}/${element.id}`, element);
  //  }




    Delete(Id: ID): Observable<ResultDeleteDTO> {
        console.log(`hi you are now in way to Delete to ${this.myURL}`, Id);
        return this.httpClient.delete<ResultDeleteDTO>
            (`${this.myURL}${CRUD_ServiceDTO.DeleteById}${Id.toString()}`);
    }


}
