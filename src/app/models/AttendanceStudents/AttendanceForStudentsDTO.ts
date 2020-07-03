  export interface AttendanceForStudentsDTO {
    StudentsCount: number;
    AppoitmentsCount: number;
    AttendanceTotalRate: number;
    CRN: string,
    TermCode: string,
    Group: Group[];
  }

  interface Group {
    StudentNameAr: string;
    StudentNameEn: string;
    StudentId: number;
    AttendanceRate: number;
    AttendanceCount: number;

    AbsenceCount: number;
    PremissionCount: number;
    ExcuseCount: number;
    LateCount: number;
    Day: number;
    AttendanceLocationCode: number;
 
    
  }