import { Router } from '@angular/router';
import { AttendanceStatusDTO } from './../../models/AttendanceStudents/AttendanceStatusDTO';
import { attendanceStatusService } from './../../services/attendanceStatus.service';
import { filter } from 'rxjs/operators';
import { AttendanceStudentsFilterModel, CodeGenerator } from './../../models/AttendanceStudents/AttendanceStudentsFilterModel';
import { FilterAttendanceStudentsService } from './../../services/FilterAttendanceStudents.service';
import { LectureScheduleFilterModelForAttendance } from './../../models/admin/LectureSchedule/LectureScheduleFilterModelForAttendance';
import { LectureScheduleFilterModel } from 'src/app/models/admin/LectureSchedule/LectureScheduleFilterModel';
import { LectureScheduleService } from 'src/app/services/admin/LectureSchedule/lecture-schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionsDTO } from './../../models/Sections/SectionsDTO';
import { SectionsFilterModel } from './../../models/Sections/SectionsFilterModel';
import { SectionsService } from './../../services/admin/Sections/sections.service';
import { CurrentTermService } from './../../services/admin/Term/current-term.service';
import { CurrentTermDTO } from './../../models/term/CurrentTermDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AttendStudentsByFaculityMemberDTO } from 'src/app/models/AttendanceStudents/AttendStudentsByFaculityMemberDTO';
import { AttendanceStudentsDataDTO } from 'src/app/models/AttendanceStudents/AttendanceStudentsUpdateDTO';

@Component({
  selector: 'app-attendance-record',
  templateUrl: './attendance-record.component.html',
  styleUrls: ['./attendance-record.component.css']
})
export class AttendanceRecordComponent implements OnInit {

  // Variables
  srchForm: FormGroup;
  showReg: boolean = false;
  showTimer: boolean = false;
  pageLang = document.documentElement.lang;
  currentTerm: any;
  sections: any = [];
  lectures: any = [];
  mobCode: string;
  students: AttendanceStudentsDataDTO[] = [];
  attendanceStatus: AttendanceStatusDTO[];
  StudentsCount: number;
  showCards: boolean = false;
  searchTerm: any = '';

  showModal: boolean = false;
  showAlert: boolean = false;
  showStatusBar: boolean = false;



  //Progress variables
  progVal: number = 0;
  progMax: number = 0;




  // Filter Models Instances
  SectionsFilterModel: SectionsFilterModel = new SectionsFilterModel();
  LectureScheduleFilterModelForAttendance: LectureScheduleFilterModelForAttendance = new LectureScheduleFilterModelForAttendance();
  filter: AttendanceStudentsFilterModel = new AttendanceStudentsFilterModel();
  CodeGenerator: CodeGenerator = new CodeGenerator();

  date;

  constructor(private CurrentTermService: CurrentTermService, private SectionsService: SectionsService, private LectureScheduleService: LectureScheduleService, private FilterAttendanceStudentsService: FilterAttendanceStudentsService, private attendanceStatusService: attendanceStatusService, public Router: Router, public translate: TranslateService, public location: Location) { }

  ngOnInit(): void {

    this.date = new Date();

    // init search form
    this.srchForm = new FormGroup({
      sections: new FormControl(null, Validators.required),
      lectures: new FormControl(null, Validators.required),
      location: new FormControl(1, Validators.required),
      date: new FormControl(null, Validators.required),
      UseCodeGenerator: new FormControl(false),
      ExpirationSeconds: new FormControl(0)
    })

    // Get Current Term
    this.CurrentTermService.GetAll().subscribe(res => {
      this.currentTerm = res;
      this.LectureScheduleFilterModelForAttendance.TermCode = this.currentTerm.TermCode;
      this.LectureScheduleService.FilterForFacultyMember(this.LectureScheduleFilterModelForAttendance).subscribe(res => this.sections = res.List);
    });

    // Get Sections By TermCode

    // Translate Table (Ar & En)
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          this.pageLang = event.lang;
        } if (event.lang == 'en') {
          this.pageLang = event.lang;
        }
      });

    // seconds validator & disabled
    this.srchForm.get('ExpirationSeconds').disable();
    this.srchForm.get('UseCodeGenerator').valueChanges.subscribe(v => {
      if (v) {
        this.srchForm.get('ExpirationSeconds').enable();
        this.srchForm.get('ExpirationSeconds').setValidators([Validators.required, Validators.min(1), Validators.max(900), Validators.maxLength(3), Validators.minLength(1)]);
      } else {
        this.srchForm.get('ExpirationSeconds').disable();
        this.srchForm.get('ExpirationSeconds').clearValidators();
        this.srchForm.patchValue({
          ExpirationSeconds: ''
        });
      }
    })

  }

  // Get Lectures Schedule by Crn onChange section
  onChangeSection(section) {
    this.LectureScheduleFilterModelForAttendance.Crn = section.Crn;  // static value
    this.LectureScheduleService.FilterForAttendance(this.LectureScheduleFilterModelForAttendance).subscribe(res => this.lectures = res.List);
  }

  // start progress timer
  startProg() {
    this.progVal = this.srchForm.get('ExpirationSeconds').value;
    this.progMax = this.srchForm.get('ExpirationSeconds').value;
    const interv = setInterval(() => {
      this.progVal -= 1;
      // After time finished
      if (this.progVal <= 0) {
        clearInterval(interv);
        this.showTimer = false;
        this.studentFilter();
        this.CodeGenerator.UseCodeGenerator = false;
        this.filter.CodeGenerator = this.CodeGenerator;
        this.attendanceStatusService.GetAll().subscribe(res => this.attendanceStatus = res.List);
        // this.FilterAttendanceFunctionAfterTimer();
        this.srchForm.patchValue({
          UseCodeGenerator: false,
          ExpirationSeconds: 0
        });
        this.FilterAttendanceFunction();
        this.showReg = false;
      };
    }, 1000)
  }


  // Student filter values
  studentFilter() {
    this.filter.Crn = this.srchForm.get('lectures').value.Crn;
    this.filter.TermCode = this.currentTerm.TermCode;
    this.filter.Date = this.srchForm.get('date').value;
    this.filter.Day = this.srchForm.get('lectures').value.Day;
    this.filter.AttendanceLocationCode = this.srchForm.get('location').value;
    this.filter.StartTime = this.srchForm.get('lectures').value.StartTime;
    this.filter.EndTime = this.srchForm.get('lectures').value.EndTime;
    this.filter.CourseNumber = this.srchForm.get('sections').value.CourseNumber;
    this.filter.CourseSubject = this.srchForm.get('sections').value.CourseSubject;
    this.CodeGenerator.UseCodeGenerator = this.srchForm.get('UseCodeGenerator').value;
    this.CodeGenerator.ExpirationSeconds = this.srchForm.get('ExpirationSeconds').value;
    this.filter.CodeGenerator = this.CodeGenerator;
  }

  // Filter Attendance Function (post from api)
  FilterAttendanceFunction() {
    this.FilterAttendanceStudentsService.FilterAttendance(this.filter).subscribe(res => {
      this.showCards = true;
      // Get Attendance Status
      this.attendanceStatusService.GetAll().subscribe(res => this.attendanceStatus = res.List);
      this.showStatusBar = true;
      this.students = res.StudentData;
      this.StudentsCount = res.StudentsCount;

      if (this.filter.CodeGenerator.UseCodeGenerator) {
        this.showStatusBar = false;
        this.mobCode = res.MobileCode;
        //start timer here

        this.showTimer = true;
        this.showCards = true;
        this.startProg();
      }else{
        this.CodeGenerator.ExpirationSeconds = 0;
      }
    });
  }

  // Filter Attendance After Timer Function (post from api)
  FilterAttendanceFunctionAfterTimer() {
    this.FilterAttendanceStudentsService.FilterAfterTimer(this.filter).subscribe(res => {
      this.students = res.List;
    });
  }



  // Search Filter
  searchSubmit() {
    if (this.srchForm.get('UseCodeGenerator').value == false) {
      this.showTimer = false;
      // this.attendanceStatus.filter(data => data.AttendanceStatusCode > 2);
    }
    this.studentFilter();
    this.FilterAttendanceFunction();
  }


  refresh(): void {
    this.Router.navigateByUrl("admin/facultyMember", { skipLocationChange: true }).then(() => {
      this.Router.navigate([decodeURI(this.location.path())]);
    })
  }


}
