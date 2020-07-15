import { LectureScheduleService } from 'src/app/services/admin/LectureSchedule/lecture-schedule.service';
import { FilterAttendanceStudentsService } from './../../services/FilterAttendanceStudents.service';
import { AttendanceForStudentsDTO } from './../../models/AttendanceStudents/AttendanceForStudentsDTO';
import { FilterAttendanceForStudentsDTO } from './../../models/AttendanceStudents/FilterAttendanceForStudentsDTO';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { attendanceStatusService } from './../../services/attendanceStatus.service';

import { CurrentTermService } from './../../services/admin/Term/current-term.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';
import { LectureScheduleFilterModelForAttendance } from 'src/app/models/admin/LectureSchedule/LectureScheduleFilterModelForAttendance';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'manage-attendance-absence',
  templateUrl: './manage-attendance-absence.component.html',
  styleUrls: ['./manage-attendance-absence.component.css']
})
export class ManageAttendanceAbsenceComponent implements OnDestroy, OnInit {

  currentTerm: any;
  pageLang = document.documentElement.lang;
  sections:any=[];
  attendanceStatus:any=[];
  srchForm:FormGroup;
  Students:AttendanceForStudentsDTO;
  StudentsGroupLength:number;
  AppoitmentsCount:number;
  studentsCount:number;
  AttendanceTotalRate:number;
  CRN:string;
  TermCode:string;
  show0: boolean = true;

  // new variables
  TotalCreditHours:number;
  RecordedHours: number;
  RecordedLecturesCount: number;
  StudentsCount: number;


  studentsData: boolean = true;
  searched: boolean = true;
 // Initialized Table
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 isDtInitialized:boolean = false;

  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};

  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering

    // Initialized Table

  constructor(
    private attendanceStatusService: attendanceStatusService,
    private AttendanceForStudentsservice:FilterAttendanceStudentsService,
    private CurrentTermService:CurrentTermService,
    private LectureScheduleService: LectureScheduleService,
    public  translate: TranslateService,
    private titleService: Title,
    private Router: Router,
    private FilterAttendanceStudentsService: FilterAttendanceStudentsService
  ) { }

  LectureScheduleFilterModelForAttendance: LectureScheduleFilterModelForAttendance = new LectureScheduleFilterModelForAttendance();

  filter: FilterAttendanceForStudentsDTO = new FilterAttendanceForStudentsDTO();

  ngOnInit(): void {


    this.dtOptions = DatatableOptionsClient;

        // init search form
        this.srchForm = new FormGroup({
          sections: new FormControl(null, Validators.required)
        });

                  // Translate Table (Ar & En)
        this.translate.onLangChange
        .subscribe((event: LangChangeEvent) => {
         if(event.lang == 'ar'){
          this.pageLang = event.lang;
          this.titleService.setTitle("   إدارة الحضور والغياب");

          this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
          // this.getAllData();
         }if (event.lang == 'en'){
          this.pageLang = event.lang;
          this.titleService.setTitle(" Manage Attendance And Absence");
          this.dtOptions.language.url = `/assets/i18n/English.json`;
          // this.getAllData();
         }
        });

           // Get Current Term
   this.CurrentTermService.GetAll().subscribe(res =>  {
    this.currentTerm = res
       // Get Sections By TermCode
   this.LectureScheduleFilterModelForAttendance.TermCode = this.currentTerm.TermCode;
   this.LectureScheduleService.FilterForFacultyMember(this.LectureScheduleFilterModelForAttendance).subscribe(res => this.sections = res.List);
   } );


  }


 // getAttendanceLectures
 getAttendanceStudent(){
  this.filter.Crn = this.srchForm.get('sections').value.Crn;
  this.filter.TermCode = this.srchForm.get('sections').value.TermCode;
  this.FilterAttendanceStudentsService.getAttendanceForStudents(this.filter).subscribe(res => {
    this.Students = res;
    this.studentsCount = res.StudentsCount;
        this.AppoitmentsCount = res.AppoitmentsCount;
        this.AttendanceTotalRate = res.AttendanceTotalRate;
        this.CRN = res.CRN;
        this.TermCode = res.TermCode;
        this.TotalCreditHours = res.TotalCreditHours;
        this.RecordedHours = res.RecordedHours;
        this.RecordedLecturesCount = res.RecordedLecturesCount;
        this.StudentsCount = res.StudentsCount;

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




  // Search Submit
   searchSubmit(){
   this.getAttendanceStudent();
    this.searched = true;
    this.show0= false;
   }

   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }







   StudentAttendance(StudentId){
    this.Router.navigate(['/facultyMember/StudentAttendance', this.CRN,this.TermCode,StudentId ])

  }

  }
   // Calculations End
