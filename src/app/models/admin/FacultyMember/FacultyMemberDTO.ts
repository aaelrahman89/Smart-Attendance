export interface FacultyMemberDTO {
    Id: number;
    DepartmentCode: string;
    CollegeCode: string;
    StaffNumber: string;
    UniversityEmail: string;
    NationalId: string;
    NameAr: string;
    NameEn: string;
    Nationality: string;
    Gender: string;
    DateOfBirth: string;
    AlternativeEmail: string;
    ScientificDegree: number;
    IsActive: boolean;
    College: College;
    Department: Department;
    FacultyMemberEnrollment: FacultyMemberEnrollment[];
  }

  interface FacultyMemberEnrollment {
    Id: number;
    TermCode: string;
    CourseSubject: string;
    CourseNumber: string;
    Crn: string;
    FacultyMemberId: number;
    LectureTypeId: number;
    Course: Course;
    Section: Section;
    Term: Term;
  }

  interface Course {
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
  }

  interface Term {
    TermCode: string;
    NameAr: string;
    NameEn: string;
    Year: string;
    StartDate: string;
    EndDate: string;
    IsActive: boolean;
  }

  interface Department {
    DeptartmentCode: string;
    CollegeCode: string;
    NameAr: string;
    NameEn: string;
    IsActive: boolean;
    College: College;
  }

  interface College {
    CollegeCode: string;
    NameAr: string;
    NameEn: string;
    IsActive: boolean;
  }
