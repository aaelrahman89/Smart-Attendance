import { FilterModel } from '../commonModels/FilterModel';

export class FilterAttendanceStudentsDTO extends FilterModel{
  FacultyMemberId: number;
  FacultyMemberNameAr: string = '';
  FacultyMemberNameEn: string = '';
  Crn: string = '';
  TermCode: string = '';
  Date: string = '';
  Day: number;
  AttendanceLocationCode: number;
  StartTime: string = '';
  EndTime: string = '';
  CourseNumber: string = '';
  CourseSubject: string = '';
  UseCodeGenerator: boolean;
  ExpirationSeconds: number;
}

