import { ResultSaveListGeneric } from './../../models/CommonModels/ResultSaveListGeneric';
import { ResultSaveGeneric } from './../../models/CommonModels/ResultSaveGeneric';
import { Observable } from 'rxjs';
import { IResultForDatatTableDTO } from '../../models/CommonModels/IResultForDatatTableDTO';
import { ResultDeleteDTO } from '../../models/CommonModels/ResultDeleteDTO';


export interface CrudOperations<DTO, ID, Filter> {
    GetAll2(filter: Filter): Observable<IResultForDatatTableDTO<DTO>>;
    GetById(Id: ID): Observable<DTO>;
    Insert(model: DTO): Observable<ResultSaveGeneric<DTO>>;
    Update(model: DTO): Observable<ResultSaveGeneric<DTO>>;
    Delete(Id: ID): Observable<ResultDeleteDTO>;
}