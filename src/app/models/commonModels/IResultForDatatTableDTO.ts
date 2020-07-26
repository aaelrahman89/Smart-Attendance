import { IResultPaging } from './IResultPaging';

export interface IResultForDatatTableDTO<T> {
    [x: string]: any;
    List: T[];
    ResultPaging: IResultPaging;
    StudentData: T[];
    Attendances: T[];
    StudentsCount: T[];
}
