import { FilterModel } from 'src/app/models/commonModels/FilterModel';

export class AttendanceStudentsFilterModel extends FilterModel{
  Crn: string = '';
  TermCode: string = '';
  Date: string = '';
  Day: number;
  RegistrationMethodID: number;
  RoomID: number;
  StartTime: string = '';
  EndTime: string = '';
  CourseNumber: string = '';
  CourseSubject: string = '';
  AttendanceLocationCode: number;
  ExpirationSeconds: number = 0;
  CodeGenerator: CodeGenerator;
}

export class CodeGenerator{
  UseCodeGenerator: boolean = false;
}




