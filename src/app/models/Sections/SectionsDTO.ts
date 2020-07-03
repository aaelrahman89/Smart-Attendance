export interface SectionsDTO {
  Crn: string;
  TermCode: string;
  CourseSubject: string;
  CourseNumber: string;
  CollegeCode: string;
  DeptartmentCode: string;
  NameAr: string;
  NameEn: string;
  CourseTitleAr: string;
  CourseTitleEn: string;
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
  FacultyMemberEnrollment: FacultyMemberEnrollment[];
  Id: number;
}

interface FacultyMemberEnrollment {
  Id: number;
  Crn: string;
  TermCode: string;
  CourseSubject: string;
  CourseNumber: string;
  FacultyMemberId: number;
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
  DepartmentCode: string;
  
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
