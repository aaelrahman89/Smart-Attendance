import { NgxSpinnerModule } from 'ngx-spinner';
import { ManageAttendanceAbsenceComponent } from './facultyMember/manage-attendance-absence/manage-attendance-absence.component';
import { StudentsFilterPipe } from './pipes/attendanceStudents-filter.pipe';
import { AuthGuard } from './guards/auth.guard';
import { TestComponent } from './test/test.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

import { MatSliderModule } from '@angular/material/slider';
import { DeptartmentsComponent } from './admin/deptartments/deptartments.component';
import { CollegesComponent } from './admin/colleges/colleges.component';
import { BrowserModule ,Title} from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AttendanceRecordComponent } from './facultyMember/attendance-record/attendance-record.component';
import { ManageAttComponent } from './facultyMember/manage-att/manage-att.component';
import { ManageREQComponent } from './facultyMember/manage-req/manage-req.component';
import { HelpComponent } from './facultyMember/help/help.component';
import { IndexComponent } from './facultyMember/index/index.component';

import {MatDatepickerModule} from '@angular/material/datepicker';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

import { StudentComponent } from './facultyMember/student/student.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTbleComponent } from './facultyMember/data-tble/data-tble.component';
import { DatatableComponent } from './facultyMember/datatable/datatable.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';



import { MajorsComponent } from './admin/majors/majors.component';
import { FacultyMemberComponent } from './admin/faculty-member/faculty-member.component';
import { MenuComponent } from './facultyMember/menu/menu.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SectionsComponent } from './admin/sections/sections.component';
import { TermComponent } from './admin/term/term.component';
import { MemberComponent } from './admin/faculty-member/member/member.component';
import { SessionManagementComponent } from './admin/session-management/session-management.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { LectureScheduleComponent } from './admin/sections/lecture-schedule/lecture-schedule.component';
import { AhmedComponent } from './uitest/ahmed/ahmed.component';
import { NehadComponent } from './uitest/nehad/nehad.component';
import { MostafaComponent } from './uitest/mostafa/mostafa.component';
import { SrchFormComponent } from './components/srch-form/srch-form.component';
import { ExportComponent } from './components/export/export.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AttendanceSettingsComponent } from './admin/attendance-settings/attendance-settings.component';
import { EducationSystemComponent } from './admin/attendance-settings/education-system/education-system.component';
import { StudentStatusComponent } from './admin/attendance-settings/student-status/student-status.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConvertFrom24To12FormatPipe } from './pipes/convert-from24-to12-format.pipe';
import { LectureScheduleViewComponent } from './admin/sections/lecture-schedule-view/lecture-schedule-view.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { StudentEnrollmentComponent } from './admin/student-admin/student-enrollment/student-enrollment.component';
import { StudentEnrollmentViewComponent } from './admin/student-admin/student-enrollment-view/student-enrollment-view.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { ManageStudentAttendanceComponent } from './facultyMember/manage-student-attendance/manage-student-attendance.component';
import { ConvertFrom24To12FormatArPipe } from './pipes/convert-from24-to12-formatAr.pipe';
import { GetAttendanceForLectureComponent } from './facultyMember/get-attendance-for-lecture/get-attendance-for-lecture.component';
import { LangInterceptorService } from './services/lang-interceptor.service';
import { AttendanceRecordByLectureComponent } from './facultyMember/attendance-record/attendance-record-by-lecture/attendance-record-by-lecture.component';
import { AttendanceRecordCardsComponent } from './facultyMember/attendance-record/attendance-record-cards/attendance-record-cards.component';
import { AlertDeleteComponent } from './components/alert-delete/alert-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ProgressListComponent } from './facultyMember/MyTasks/Progress/progress-list/progress-list.component';
import { ProgressViewComponent } from './facultyMember/MyTasks/Progress/progress-view/progress-view.component';
import { CompletedListComponent } from './facultyMember/MyTasks/Completed/completed-list/completed-list.component';

import { AlertComponent } from './components/alert/alert.component';
import { GeneralAlertComponent } from './components/general-alert/general-alert.component';
import { LiftTheAbsenceComponent } from './admin/attendance-settings/lift-the-absence/lift-the-absence.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MainIndexComponent } from './mainIndex/main-index/main-index.component';
import { ModalServiceModule } from './modal-service/modal-service.module';
import { MyModalComponent } from './my-modal.component';
import { ModalComponent } from './modal/modal/modal.component';
import { AskedpermissionComponent } from './facultyMember/MyTasks/askedpermission/askedpermission.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ThemeComponent } from './admin/theme/theme.component';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
//import { QRCodeModule } from 'angular2-qrcode';

//import { QRCodeModule } from 'angular2-qrcode';
import { TermInterceptorService } from './services/term-interceptor.service';






export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AttendanceRecordComponent,
    ManageAttComponent,
    ManageREQComponent,
    HelpComponent,
    IndexComponent,
    StudentComponent,
    DataTbleComponent,
    CollegesComponent,
    DatatableComponent,
    DataFilterPipe,
    DeptartmentsComponent,
    FacultyMemberComponent,
    MajorsComponent,
    MenuComponent,
    AdminMenuComponent,
    SectionsComponent,
    TermComponent,
    MemberComponent,
    SessionManagementComponent,
    CoursesComponent,
    StudentAdminComponent,
    LectureScheduleComponent,
    PageTitleComponent,
    AhmedComponent,
    NehadComponent,
    MostafaComponent,
    TestComponent,
    SrchFormComponent,
    ExportComponent,
    LoginComponent,
    RegisterComponent,
    AttendanceSettingsComponent,
    EducationSystemComponent,
    StudentStatusComponent,
    NotFoundComponent,
    ConvertFrom24To12FormatPipe,
    ConvertFrom24To12FormatArPipe,
    StudentsFilterPipe,
    LectureScheduleViewComponent,
    ManageAttendanceAbsenceComponent,
    StudentEnrollmentComponent,

    StudentEnrollmentViewComponent,

    RefreshComponent,

    ManageStudentAttendanceComponent,
    GetAttendanceForLectureComponent,
    AttendanceRecordByLectureComponent,
    AttendanceRecordCardsComponent,
    AlertDeleteComponent,
    ProgressListComponent,
    ProgressViewComponent,
    CompletedListComponent,


    AlertComponent,

    LiftTheAbsenceComponent,
    GeneralAlertComponent,
    DashboardComponent,
    MainIndexComponent,
    MyModalComponent,
    ModalComponent,
    AskedpermissionComponent,
    ProfileComponent,
    ThemeComponent,
    ProfileAdminComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    MatSliderModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    DataTablesModule.forRoot(),
    HttpClientModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    WavesModule ,
    MatPaginatorModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatInputModule,
    //QRCodeModule,
    ModalServiceModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],

  schemas: [NO_ERRORS_SCHEMA],
  providers: [Title, AuthService, AuthGuard,MatDatepickerModule,MatNativeDateModule,
    {

      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[LectureScheduleComponent,AlertDeleteComponent,MyModalComponent]
})
export class AppModule {}

//
