import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceStudentsFilterModel, CodeGenerator } from 'src/app/models/AttendanceStudents/AttendanceStudentsFilterModel';
import { FilterAttendanceStudentsService } from './../../../services/FilterAttendanceStudents.service';
import { AttendanceStudentsDataDTO } from 'src/app/models/AttendanceStudents/AttendanceStudentsUpdateDTO';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { attendanceStatusService } from './../../../services/attendanceStatus.service';
import { AttendanceStatusDTO } from 'src/app/models/AttendanceStudents/AttendanceStatusDTO';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'attendance-record-by-lecture',
  templateUrl: './attendance-record-by-lecture.component.html',
  styleUrls: ['./attendance-record-by-lecture.component.css']
})
export class AttendanceRecordByLectureComponent implements OnInit {

  Crn: string;
  TermCode: string;
  Date: any;
  Day: number;
  AttendanceLocationCode: number;
  StartTime: string;
  EndTime: string;
  CourseNumber: string;
  CourseSubject: string;
  students: AttendanceStudentsDataDTO[] = [];
  attendanceStatus: AttendanceStatusDTO[];
  pageLang = document.documentElement.lang;
  updateMessage: string;
  searchTerm: any = '';
  StudentsCount: number;
  CourseTitle: string;
  showCards: boolean = true;
  showStatusBar: boolean;

  @ViewChild('frame') frame: ModalDirective;

  constructor(private attendanceStatusService: attendanceStatusService, private ActivatedRoute: ActivatedRoute, private FilterAttendanceStudentsService: FilterAttendanceStudentsService, public translate: TranslateService) { }

  CodeGenerator: CodeGenerator = new CodeGenerator();
  filter: AttendanceStudentsFilterModel = new AttendanceStudentsFilterModel();



  ngOnInit(): void {

     // Translate Table (Ar & En)
 this.translate.onLangChange
 .subscribe((event: LangChangeEvent) => {
   if (event.lang == 'ar') {
     this.pageLang = event.lang;
   } if (event.lang == 'en') {
     this.pageLang = event.lang;
   }
 });

 this.attendanceStatusService.GetAll().subscribe(res => this.attendanceStatus = res.List);

    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.Crn = params.Crn;
      this.TermCode = params.TermCode;
      this.Date = params.Date;
      this.Day = params.Day;
      this.AttendanceLocationCode = params.AttendanceLocationCode;
      this.StartTime = params.StartTime;
      this.EndTime = params.EndTime;
      this.CourseNumber = params.CourseNumber;
      this.CourseSubject = params.CourseSubject;
      this.CourseTitle = params.CourseTitle;
    });

    this.filter.Crn = this.Crn;
    this.filter.TermCode = this.TermCode;
    this.filter.Date = this.Date; // static value - must be   this.filter.Date = this.Date;
    this.filter.Day = this.Day;
    this.filter.AttendanceLocationCode = this.AttendanceLocationCode;
    this.filter.StartTime = this.StartTime;
    this.filter.EndTime = this.EndTime;
    this.filter.CourseNumber = this.CourseNumber;
    this.filter.CourseSubject = this.CourseSubject;
    this.CodeGenerator.UseCodeGenerator = false;
    this.CodeGenerator.ExpirationSeconds = 0;
    this.filter.CodeGenerator = this.CodeGenerator;

    this.FilterAttendanceStudentsService.FilterAttendance(this.filter).subscribe(res => {
      this.students = res.StudentData;
      this.StudentsCount = this.students.length;
      this.showStatusBar = true;
      this.showCards = true;
    })

  }






}
