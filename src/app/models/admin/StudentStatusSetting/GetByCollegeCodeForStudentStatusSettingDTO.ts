export interface GetByCollegeCodeForStudentStatusSettingDTO {
  CollageCode: string;
  StudentStatusList: StudentStatusList[];
}

interface StudentStatusList {
  StatusCode: string;
  StatusName: string;
  IsActive: boolean;
}
