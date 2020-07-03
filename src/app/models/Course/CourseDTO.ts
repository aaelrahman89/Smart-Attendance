export interface CourseDTO {
  CourseSubject: string;
  CourseNumber: string;
  NameAr: string;
  NameEn: string;
  DepartmentCode: string;
  CollegeCode: string;
  TotalHours: number;
  TheoreticalHours: number;
  PracticalityHours: number;
  ExercisesHours: number;
  OralHours: number;
  IsActive: boolean;
  College: College;
  Department: Department;
  Sections: Section[];
  Id: number;
}

interface Section {
  Crn: string;
  TermCode: string;
  CourseSubject: string;
  CourseNumber: string;
  CollegeCode: string;
  DeptartmentCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  ScheduleCode: string;
  TotalCreditHours: number;
  MaxEnrollment: number;
  CurrentEnrollment: number;
  StartDate: string;
  EndDate: string;
  Weeks: number;
  TheoreticalHours: number;
  PracticalityHours: number;
  ExercisesHours: number;
  OralHours: number;
  Department: Department;
  College: College;
  Term: Term;
  Id: number;
}

interface Term {
  TermCode: string;
  NameAr: string;
  NameEn: string;
  Year: string;
  StartDate: string;
  EndDate: string;
  IsActive: boolean;
  Id: number;
}

interface Department {
  DeptartmentCode: string;
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
