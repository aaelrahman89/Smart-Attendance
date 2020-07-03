 
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, Input } from '@angular/core';
import { LectureScheduleDTO } from 'src/app/models/admin/LectureSchedule/LectureScheduleDTO';
import { LectureScheduleService } from 'src/app/services/admin/LectureSchedule/lecture-schedule.service';
import { TermService } from '../../../services/admin/Term/term.service';
import { Subject, forkJoin } from 'rxjs';
import { facultyMemberDTO } from 'src/app/models/facultymember/faculty-member-dto';
import { LectureScheduleFilterModel } from 'src/app/models/admin/LectureSchedule/LectureScheduleFilterModel';
import { TermFilterModel } from 'src/app/models/admin/Term/TermFilterModel';

@Component({
  selector: 'member-table',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
 
  @Input() memberIdForFilter; 
 
  // page lang
  pageLang = document.documentElement.lang;

  // main datatable vars :-
  dtOptions: any = {};
  dtTrigger: Subject<facultyMemberDTO> = new Subject();

  // timeline table vars :-
  timeLine : LectureScheduleDTO[];
  filter: LectureScheduleFilterModel = new LectureScheduleFilterModel();

  // term vars :- 
  terms: any = [];
  termFilter: TermFilterModel = new TermFilterModel();


  constructor(
    private LectureSchedule: LectureScheduleService,
    private TermService: TermService,
     ) { }
 

  ngOnInit(): void {
     this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      language: {
        url: `/assets/i18n/Arabic.json`
      },
      lengthMenu: [5, 10, 15, 25, 50, 100],
      pageLength: 10,
      ordering: true,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
        this.filter.pageIndex = page;
        this.filter.pagelength = dataTablesParameters.length;
        this.filter.FacultyMemberID =  this.memberIdForFilter;
        this.filter.TermCode = "143310";
        this.LectureSchedule.FilterForFacultyMember(this.filter).subscribe(
          data => {
            this.timeLine = data.List;
          console.log( "time line, " ,  this.timeLine )
          console.log( "id, " , this.memberIdForFilter) 

            callback({
              data: [],
              recordsTotal: data.ResultPaging.RecordsTotal,
              recordsFiltered: data.ResultPaging.RecordsFiltered
            });
          });
 
      }

    };
   
     
  } 
  


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
