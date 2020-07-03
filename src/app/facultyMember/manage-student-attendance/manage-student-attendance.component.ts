import { generalAlertservice } from './../../services/genericService/generalAlert.service';
import { AttendanceForStudentDTO } from './../../models/AttendanceStudents/AttendanceForStudentDTO';
import { LectureScheduleService } from 'src/app/services/admin/LectureSchedule/lecture-schedule.service';
import { FilterAttendanceStudentsService } from './../../services/FilterAttendanceStudents.service';

import { FilterAttendanceForStudentsDTO } from './../../models/AttendanceStudents/FilterAttendanceForStudentsDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { attendanceStatusService } from './../../services/attendanceStatus.service';

import { CurrentTermService } from './../../services/admin/Term/current-term.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';
import { FilterBYAttendanceForStudentsDTO } from 'src/app/models/AttendanceStudents/FilterBYAttendanceForStudentsDTO';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'manage-student-attendance',
  templateUrl: './manage-student-attendance.component.html',
  styleUrls: ['./manage-student-attendance.component.css']
})
export class ManageStudentAttendanceComponent implements OnInit {


  FilterAttendanceForStudentsDTO:FilterAttendanceForStudentsDTO=new FilterAttendanceForStudentsDTO();
  panelOpenState=false;
  currentTerm: any;
  pageLang = document.documentElement.lang;
  dtOptions: any = {};
  sections:any=[];
  AttendanceTotalRate:any;
  attendanceStatus:any=[];
  StudentNameAr:any;
  StudentNameEn:string;
  Students:AttendanceForStudentDTO;
  //dtTrigger: any = {};
  constructor(
    private attendanceStatusService: attendanceStatusService,
    private FilterAttendanceStudentsService: FilterAttendanceStudentsService,
    private CurrentTermService:CurrentTermService,
    private LectureScheduleService: LectureScheduleService,
    private Route: ActivatedRoute,
    public  translate: TranslateService,
  private titleService: Title,
  private generalAlertservice:generalAlertservice,

  ) { }

  @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 isDtInitialized:boolean = false;

  dtTrigger: Subject<any> = new Subject();


  //#region Get info From url
  Crn = this.Route.snapshot.paramMap.get('Crn');
  TermCode = this.Route.snapshot.paramMap.get('TermCode');
  StudentId = this.Route.snapshot.paramMap.get('StudentId');
//#endregion Get info From url
filter: FilterBYAttendanceForStudentsDTO = new FilterBYAttendanceForStudentsDTO();
  ngOnInit(): void {
  // Translate Table (Ar & En)
             // Translate Table (Ar & En)
             this.translate.onLangChange
             .subscribe((event: LangChangeEvent) => {
              if(event.lang == 'ar'){
               this.pageLang = event.lang;
               this.titleService.setTitle("   إدارة حضور الطلاب");
               
               this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
               // this.getAllData();
              }if (event.lang == 'en'){
               this.pageLang = event.lang;
               this.titleService.setTitle(" Manage Student Attendance");
               this.dtOptions.language.url = `/assets/i18n/English.json`;
               // this.getAllData();
              }
             });

    this.attendanceStatusService.GetAll().subscribe(res => this.attendanceStatus = res.List);

    this.dtOptions = DatatableOptionsClient;

    this.filter.Crn = this.Crn;
    this.filter.TermCode =this.TermCode;
    this.filter.StudentId = this.StudentId;

    this.FilterAttendanceStudentsService.getByIDAttendanceForStudents(this.filter).subscribe(res => {
      this.Students = res;
      this.AttendanceTotalRate = res.AttendanceTotalRate;
      this.StudentNameAr = res.StudentNameAr;
      this.StudentNameEn = res.StudentNameEn;




     if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
      });
  } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
  }
  console.log(res);
    });

  }

  ngAfterViewInit(): void {
    console.log('after init');
   // this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

  changeStatus(Student, status){
     Student.AttendanceStatusCode = status.AttendanceStatusCode;
    console.log('student status', Student.AttendanceStatusCode);
  }

    // Update all student status
    updateAllStudents(Students) {
      this.FilterAttendanceStudentsService.UpdateAttendance(Students).subscribe((res) => {
        console.log('res' , res);
        this.filter.Crn = this.Crn;
      this.filter.TermCode =this.TermCode;
      this.filter.StudentId = this.StudentId;
  
      this.FilterAttendanceStudentsService.getByIDAttendanceForStudents(this.filter).subscribe(res => {
        this.Students = res;
        this.AttendanceTotalRate = res.AttendanceTotalRate;
        
  
      });
      });
      this.generalAlertservice.openAlertSuccess();
  
    }

  // changeAttendAbsence(student){

  // }
}

