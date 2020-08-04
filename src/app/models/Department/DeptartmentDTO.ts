export interface DeptartmentDTO {
  DepartmentCode: string;
  CollegeCode: string;
  Name: string;

  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  College: College;
  Id: number;
}

interface College {
  CollegeCode: string;
  Name: string;

  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  Id: number;
}




