import { RateAttendanceViewComponent } from './admin/AttendanceReport/rate-report/rate-attendance-view/rate-attendance-view.component';
import { RateAttendanceReportComponent } from './admin/AttendanceReport/rate-report/rate-attendance-report/rate-attendance-report.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { CourseReportComponent } from './admin/AttendanceReport/course-report/course-report.component';


import { ProfileFacultyMemberComponent } from './facultyMember/profile-faculty-member/profile-faculty-member.component';
import { SystemConfigurationComponent } from './admin/system-configuration/system-configuration.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';

import { ThemeComponent } from './admin/theme/theme.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AskedpermissionComponent } from './facultyMember/MyTasks/askedpermission/askedpermission.component';
import { ProgressViewComponent } from './facultyMember/MyTasks/Progress/progress-view/progress-view.component';
import { ProgressListComponent } from './facultyMember/MyTasks/Progress/progress-list/progress-list.component';
import { AttendanceRecordByLectureComponent } from './facultyMember/attendance-record/attendance-record-by-lecture/attendance-record-by-lecture.component';
import { GetAttendanceForLectureComponent } from './facultyMember/get-attendance-for-lecture/get-attendance-for-lecture.component';

import { ManageStudentAttendanceComponent } from './facultyMember/manage-student-attendance/manage-student-attendance.component';
import { ManageAttendanceAbsenceComponent } from './facultyMember/manage-attendance-absence/manage-attendance-absence.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { StudentEnrollmentViewComponent } from './admin/student-admin/student-enrollment-view/student-enrollment-view.component';
import { StudentEnrollmentComponent } from './admin/student-admin/student-enrollment/student-enrollment.component';
import { LectureScheduleViewComponent } from './admin/sections/lecture-schedule-view/lecture-schedule-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import { TestComponent } from './test/test.component';
import { AhmedComponent } from './uitest/ahmed/ahmed.component';
import { MostafaComponent } from './uitest/mostafa/mostafa.component';

import { CoursesComponent } from './admin/courses/courses.component';
import { MajorsComponent } from './admin/majors/majors.component';
import { DeptartmentsComponent } from './admin/deptartments/deptartments.component';
import { CollegesComponent } from './admin/colleges/colleges.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './facultyMember/index/index.component';
import { AttendanceRecordComponent } from './facultyMember/attendance-record/attendance-record.component';
import { ManageAttComponent } from './facultyMember/manage-att/manage-att.component';
import { ManageREQComponent } from './facultyMember/manage-req/manage-req.component';
import { HelpComponent } from './facultyMember/help/help.component';
import { DataTbleComponent } from './facultyMember/data-tble/data-tble.component';
import { FacultyMemberComponent } from './admin/faculty-member/faculty-member.component';
import { SectionsComponent } from './admin/sections/sections.component';
import { TermComponent } from './admin/term/term.component';
import { MemberComponent } from './admin/faculty-member/member/member.component';
import { SessionManagementComponent } from './admin/session-management/session-management.component';


import { StudentComponent } from './facultyMember/student/student.component';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { LectureScheduleComponent } from './admin/sections/lecture-schedule/lecture-schedule.component';
import { AuthGuard } from './guards/auth.guard';

import { AttendanceSettingsComponent } from './admin/attendance-settings/attendance-settings.component';
import { AlertComponent } from './components/alert/alert.component';
import { CompletedListComponent } from './facultyMember/MyTasks/Completed/completed-list/completed-list.component';

 
import { DashboardComponent } from './admin/dashboard/dashboard.component'
import { MainIndexComponent } from './mainIndex/main-index/main-index.component';
import { SisComponent } from './admin/sis/sis.component';

const routes: Routes = [
  { path: '', component: MainIndexComponent, canActivate: [AuthGuard] },
  { path: 'ManageAtt', component: ManageAttComponent, canActivate: [AuthGuard] },
  { path: 'ManageREQ', component: ManageREQComponent, canActivate: [AuthGuard] },
  { path: 'Help', component: HelpComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'admin/student', component: StudentAdminComponent, canActivate: [AuthGuard] },
  { path: 'table', component: DataTbleComponent, canActivate: [AuthGuard] },
  { path: 'student/:Id', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'admin/colleges', component: CollegesComponent, canActivate: [AuthGuard] },
  { path: 'admin/deptartments', component: DeptartmentsComponent, canActivate: [AuthGuard] },
  { path: 'admin/majors', component: MajorsComponent, canActivate: [AuthGuard] },
  { path: 'admin/courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'admin/facultyMember', component: FacultyMemberComponent, canActivate: [AuthGuard] },
  { path: 'admin/sections', component: SectionsComponent, canActivate: [AuthGuard] },
  { path: 'admin/term', component: TermComponent, canActivate: [AuthGuard] },
  { path: 'admin/facultyMember/member/:id', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'admin/facultyMember/member', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'admin/SessionManagement', component: SessionManagementComponent, canActivate: [AuthGuard] },
  { path: 'admin/studentadmin', component: StudentAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/settings', component: AttendanceSettingsComponent, canActivate: [AuthGuard] },
  { path: 'admin/StudentEnrollment', component: StudentEnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'admin/StudentEnrollment/:Crn/:College/:Department/:Term', component: StudentEnrollmentViewComponent, canActivate: [AuthGuard] },
  { path: 'admin/Profileadmin', component: ProfileAdminComponent, canActivate: [AuthGuard] },
  { path: 'admin/theme', component: ThemeComponent, canActivate: [AuthGuard] },

  { path: 'admin/sis', component: SisComponent, canActivate: [AuthGuard] },


  { path: 'admin/RateReport', component: RateAttendanceReportComponent, canActivate: [AuthGuard] },
  { path: 'admin/RateReportView', component: RateAttendanceViewComponent, canActivate: [AuthGuard] },

  { path: 'admin/CourseReport', component: CourseReportComponent, canActivate: [AuthGuard] },
  { path: 'admin/Notification', component: NotificationComponent, canActivate: [AuthGuard] },
 

   
  { path: 'refresh', component: RefreshComponent },

 
  { path: 'login', component: LoginComponent, data: { showMenu: false } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },

 { path: 'admin/LectureSchedule/:Crn/:College/:Department/:Term/:CourseTitleAr/:CourseSubject/:CourseNumber', component: LectureScheduleComponent, canActivate: [AuthGuard] },
  { path: 'admin/LectureSchedule', component: LectureScheduleViewComponent, canActivate: [AuthGuard] },

  { path: 'ahmed', component: AhmedComponent },
  { path: 'test', component: TestComponent },
  { path: 'mostafa', component: MostafaComponent },
  { path: 'alert', component: AlertComponent },

  { path: 'facultyMember/attendanceRecord', component: AttendanceRecordComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/AttendanceAbsence', component: ManageAttendanceAbsenceComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/StudentAttendance/:Crn/:TermCode/:StudentId', component: ManageStudentAttendanceComponent, canActivate: [AuthGuard] },

  { path: 'facultyMember/StudentAttendanceForLecture', component: GetAttendanceForLectureComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/attendanceRecordByLecture/:Crn/:TermCode/:Date/:Day/:AttendanceLocationCode/:StartTime/:EndTime/:CourseNumber/:CourseSubject/:CourseTitle', component: AttendanceRecordByLectureComponent, canActivate: [AuthGuard] },

  { path: 'facultyMember/TasksProgres', component: ProgressListComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/TasksProgrescompleted', component: CompletedListComponent, canActivate: [AuthGuard] },

  { path: 'facultyMember/TasksProgresView/:Id', component: ProgressViewComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/AskedpermissionView/:Id', component: AskedpermissionComponent, canActivate: [AuthGuard] },
  { path: 'facultyMember/ProfileFaculty', component: ProfileFacultyMemberComponent, canActivate: [AuthGuard] },





  

  { path: 'admin/system-configuration', component: SystemConfigurationComponent, canActivate: [AuthGuard] },


  


  // Must be last route
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard], data: { showMenu: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
