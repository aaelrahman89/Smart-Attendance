export interface AttendanceForLectureDTO {
  AbsecnceAverageRate: number;
  AttendanceTotalRate: number;
  StudentsCount: number;
  AppoitmentsCount: number;
  CRN: string;
  CourseNumber: string;
  CourseSubject: string;
  TermCode: string;
  Group: Group[];
}

interface Group {
  Date: string;
  StartTime: string;
  EndTime: string;
  AttendanceRate: number;
  AttendanceCount: number;
  AbsenceCount: number;
  PremissionCount: number;
  ExcuseCount: number;
  AbsenceRate: number;
  LateCount: number;
  Day: number;
  AttendanceLocationCode: number;
}
