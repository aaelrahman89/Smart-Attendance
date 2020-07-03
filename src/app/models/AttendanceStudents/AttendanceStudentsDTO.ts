import { AttendanceStudentsDataDTO } from './AttendanceStudentsUpdateDTO';

export interface AttendanceStudentsDTO {
  FacultyMemberId: number;
  FacultyMemberNameAr: string;
  FacultyMemberNameEn: string;
  Crn: string;
  TermCode: string;
  Date: string;
  Day: number;
  AttendanceLocationCode: number;
  StartTime: string;
  EndTime: string;
  CourseNumber: string;
  CourseSubject: string;
  CodeGenerator: CodeGenerator;
  StudentData:AttendanceStudentsDataDTO[];
  StudentsCount:number;
  MobileCode:string;
}

interface CodeGenerator {
  UseCodeGenerator: boolean;
  ExpirationSeconds: number;
}
