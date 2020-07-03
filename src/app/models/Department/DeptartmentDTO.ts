export interface DeptartmentDTO {
  DepartmentCode: string;
  CollegeCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  College: College;
  Id: number;
}

interface College {
  CollegeCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  Id: number;
}




