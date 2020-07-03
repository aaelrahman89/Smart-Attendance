export interface StudentAdminDTO {
  Id: number;
  StudentId: number;
  StudentNumber: string;
  Email: string;
  NationalId: string;
  NameAr: string;
  NameEn: string;
  CollegeCode: string;
  DepartmentCode: string;
  MajorCode: string;
  MajorNameAr: string;
  MajorNameEn: string;
  NationalityCode: string;
  Gender: string;
  DateOfBirth: string;
  MobileNumber: string;
  AlternativeEmail: string;
  StudentStatusCode: string;
  AcademicStatus: number;
  GuardianName: string;
  GuardianRelativeRelationId: number;
  GuardianMobileNumber: string;
  GuardianEmail: string;
  IsActive: boolean;
  RelativeRelationId: number;
  College: College;
  Department: Department;
  StudentStatusAr: string;
  StudentStatusEn: string;
  StudentStatus: StudentStatus;
}
interface StudentStatus {
  Id: number;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
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


