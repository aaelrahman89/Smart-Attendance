import { IResultPaging } from './IResultPaging';

export interface IResultForDatatTableDTO<T> {
    List: T[];
    ResultPaging: IResultPaging;
    StudentData: T[];
    Attendances: T[];
    StudentsCount: T[];
}
