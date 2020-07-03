export interface AttendanceForStudentDTO {
  AppoitmentsCount: number;
  AttendanceTotalRate: number;
  StudentNameAr: string;
  StudentNameEn: string;
  StudentId: number;
  Group: Group[];
}

interface Group {
  Date: string;
  StartTime: string;
  EndTime: string;
  AttendanceId: number;
  AttendanceStatusCode: number;
}

