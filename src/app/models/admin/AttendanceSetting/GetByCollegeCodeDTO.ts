export class GetByCollegeCodeDTO {
  Id: number;
  CollegeCode: string;
  LearningSystemTypeId: number;
  IsDefault: boolean;
  AttendanceSetting: AttendanceSetting[];
}

export class AttendanceSetting {
  Id: number=0;
  AttendanceStatusCode: number=0;
  AttendancePrecentage: number=0;
  AllowedCount: number=0;
  GrantAuthorityFacultyMember: boolean=null;
  CalculatedToStatusCode: number=0;
  IsActive: boolean=false;
}

