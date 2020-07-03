import { FilterModel } from './../../commonModels/FilterModel';

export class StudentAdminFilterModel extends FilterModel {
  DepartmentCode: string = '';
  CollegeCode: string = '';
  NationalityCode: string = '';
  MajorCode: string = '';
  StudentStatusCode:string='';
}
