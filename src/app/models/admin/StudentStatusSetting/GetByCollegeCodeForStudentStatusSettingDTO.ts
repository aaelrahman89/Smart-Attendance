export interface GetByCollegeCodeForStudentStatusSettingDTO {
  CollageCode: string;
  StudentStatusList: StudentStatusList[];
}

export class GetByCollegeCodeForStudentStatusSettingClass {
  CollageCode: string = '';
  StudentStatusList: StudentStatusList[];
}

export interface StudentStatusList {
  Id: number;
  StatusId: number;
  StatusCode: string;
  StatusName: string;
  IsActive: boolean;
}

export class StudentStatusList {
  Id: number = 0;
  StatusId: number = 0;
  StatusCode: string = '';
  StatusName: string = '';
  IsActive: boolean = false;
}
