export interface AttendanceSettingDTO {
  Id: number;
  CollegeCode: string;
  AttendanceStatusCode: number;
  AttendancePrecentage: number;
  AllowedCount: number;
  GrantAuthorityFacultyMember: boolean;
  IsDefault: boolean;
}
