import { AlertDeleteService } from './../../services/genericService/AlertDelete.service';

import { LectureScheduleFilterModelForAttendance } from './../../models/admin/LectureSchedule/LectureScheduleFilterModelForAttendance';
import { LectureScheduleFilterModel } from 'src/app/models/admin/LectureSchedule/LectureScheduleFilterModel';
import { LectureScheduleService } from 'src/app/services/admin/LectureSchedule/lecture-schedule.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionsFilterModel } from './../../models/Sections/SectionsFilterModel';
import { SectionsService } from './../../services/admin/Sections/sections.service';
import { CurrentTermService } from './../../services/admin/Term/current-term.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FilterAttendanceStudentsService } from './../../services/FilterAttendanceStudents.service';
import { AttendanceStudentsFilterModel } from 'src/app/models/AttendanceStudents/AttendanceStudentsFilterModel';
import { AttendanceForLectureDTO } from 'src/app/models/AttendanceStudents/AttendanceForLectureDTO';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';

@Component({
  selector: 'get-attendance-for-lecture',
  templateUrl: './get-attendance-for-lecture.component.html',
  styleUrls: ['./get-attendance-for-lecture.component.css']
})
export class GetAttendanceForLectureComponent implements OnDestroy, OnInit {

  srchForm: FormGroup;

  currentTerm: any;
  sections: any = [];
  lectures: AttendanceForLectureDTO;
  pageLang = document.documentElement.lang;
  searched: boolean = false;
  CourseTitle: string;

  show0: boolean = true;


  LectureScheduleFilterModelForAttendance: LectureScheduleFilterModelForAttendance = new LectureScheduleFilterModelForAttendance();
  filter: AttendanceStudentsFilterModel = new AttendanceStudentsFilterModel();


  // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;



// Must be declared as "any", not as "DataTables.Settings"
dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();


  constructor(private CurrentTermService: CurrentTermService,
               private SectionsService: SectionsService,
                private LectureScheduleService: LectureScheduleService,
                private FilterAttendanceStudentsService: FilterAttendanceStudentsService,
                public  translate: TranslateService,
                private AlertDeleteService: AlertDeleteService
                ) { }

  ngOnInit(): void {

    this.dtOptions = DatatableOptionsClient;

    // this.lectures.fo


        // init search form
        this.srchForm = new FormGroup({
          sections: new FormControl(null, Validators.required)
        });

                  // Translate Table (Ar & En)
                  this.translate.onLangChange
                  .subscribe((event: LangChangeEvent) => {
                   if(event.lang == 'ar'){
                    this.pageLang = event.lang;
                   }if (event.lang == 'en'){
                    this.pageLang = event.lang;
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
    getAttendanceLectures(){
      this.filter.Crn = this.srchForm.get('sections').value.Crn;
      this.filter.TermCode = this.srchForm.get('sections').value.TermCode;
      this.FilterAttendanceStudentsService.getAttendanceForLecture(this.filter).subscribe(res => {
        this.lectures = res;
        console.log('lectures', this.lectures);
       if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
    }
      });
    }

  // Search Submit
   searchSubmit(){
   this.getAttendanceLectures();
    this.searched = true;
    this.show0 = false;
    this.CourseTitle= this.srchForm.get('sections').value.CourseTitleAr;
   }

   ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


// Delete Lecture
deleteLecture(lecture, lectures){

  this.AlertDeleteService.openConfirmDialog()
  .afterClosed().subscribe(res =>{
    if(res){
      this.FilterAttendanceStudentsService.deleteAttendanceStudents(lecture, lectures).subscribe(res => {
        this.getAttendanceLectures();
      });
    }

  });


}



}
