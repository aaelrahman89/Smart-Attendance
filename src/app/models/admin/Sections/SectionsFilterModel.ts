import { FilterModel } from './../../commonModels/FilterModel';

export class SectionsFilterModel extends FilterModel {
  // tslint:disable-next-line: no-inferrable-types
  DepartmentCode: string = '';
  // tslint:disable-next-line: no-inferrable-types
  CollegeCode: string = '';
  // tslint:disable-next-line: no-inferrable-types
  TermCode: string = '';
}
