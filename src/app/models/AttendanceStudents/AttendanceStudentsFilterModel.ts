import { FilterModel } from 'src/app/models/commonModels/FilterModel';

export class AttendanceStudentsFilterModel extends FilterModel{
  FacultyMemberId: number;
  Crn: string = '';
  TermCode: string = '';
  Date: any;
  Day: number;
  AttendanceLocationCode: number;
  StartTime: string = '';
  EndTime: string = '';
  CourseNumber: string = '';
  CourseSubject: string = '';
  CodeGenerator: CodeGenerator;
}

export class CodeGenerator{
  UseCodeGenerator: boolean = false;
  ExpirationSeconds: number = 0;
}
