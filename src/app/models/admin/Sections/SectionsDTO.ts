export interface SectionsDTO {
  Id:number,
  Crn: string;
  TermCode: string;
  CourseSubject: string;
  CourseNumber: string;
  CollegeCode: string;
  DepartmentCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  ScheduleCode: string;
  CourseTitleAr:string;
  TotalCreditHours: number;
  MaxEnrollment: number;
  CurrentEnrollment: number;
  StartDate: Date;
  EndDate: Date;
  Weeks: number;
  TheoreticalHours: number;
  PracticalityHours: number;
  ExercisesHours: number;
  OralHours: number;
  Department: Department;
}

interface Department {
  Id:number,
  DepartmentCode: string;
  CollegeCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  College: College;
}

interface College {
  Id:number,
  CollegeCode: string;
  NameAr: string;
  NameEn: string;
  IsActive: boolean;
  Department: Term;
}

interface Term {
  Id:number,
  TermCode: string;
  NameAr: string;
  NameEn: string;
  Year: string;
  StartDate: Date;
  EndDate: Date;
  IsActive: boolean;
}
