export interface MajorDTO {
  MajorCode: string;
  DepartmentCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  Department: Department;
  Id: number;
}

interface Department {
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
