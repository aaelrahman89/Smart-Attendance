import { TermFilterModel } from './../../models/admin/Term/TermFilterModel';
import { TermService } from './../../services/admin/Term/term.service';
import { SectionsFilterModel } from '../../models/admin/Sections/SectionsFilterModel';
import { SectionsService } from './../../services/admin/Sections/sections.service';
import { CollegeService } from './../../services/college.service';

import { DeptartmentService } from './../../services/deptartment.service';
import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { Title } from '@angular/platform-browser';
import { SectionsDTO } from 'src/app/models/admin/Sections/SectionsDTO';
import { Router } from '@angular/router';






@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})
export class SectionsComponent implements OnInit {
      // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;



 





   


  // Rerender Table
  rerender(): void {
    console.log("element", this.dtElement)
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

 
    


dtOptions: any = {};


  dtTrigger: Subject<SectionsDTO> = new Subject();

  filter: SectionsFilterModel = new SectionsFilterModel();


  departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

  termFilter: TermFilterModel = new TermFilterModel();




  elementsFiltered: SectionsDTO[];

  colleges: any = [];
  departments: any = [];
  terms: any = [];
  srchForm: FormGroup;

  showTable = false;
  constructor(
    private myservice: SectionsService,
    private DeptartmentService: DeptartmentService,
    private CollegeService: CollegeService,
    private TermService: TermService,

    private titleService: Title,
    private Router: Router,
    public  translate: TranslateService,
    @Inject('Window') private window: Window,
  ) {

  }


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
  
          this.filter.CollegeCode = this.srchForm.get('college').value;
          this.filter.DepartmentCode = this.srchForm.get('department').value;
          this.filter.TermCode = this.srchForm.get('term').value;
  
          this.myservice.Filter(this.filter)
            .subscribe(resp => {
              this.elementsFiltered = resp.List;
              // this.sessionService.Set(resp.List[0]);
              console.log(" before call ", resp)
              callback({
                data: [],
                recordsTotal: resp.ResultPaging.RecordsTotal,
                recordsFiltered: resp.ResultPaging.RecordsFiltered
              });
            });
        },

       
      };


    // Translate Table (Ar & En)
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
      this.titleService.setTitle("إدارة الشعب الدراسية");
      this.rerender();
     }if (event.lang == 'en'){
      this.dtOptions.language.url = `/assets/i18n/English.json`;
      this.titleService.setTitle("Academic Divisions Administration");
      this.rerender();
     }
    });




  
  
    // Get Colleges
    this.CollegeService.GetAll().subscribe(
      (coll) => (this.colleges = coll.List)
    );
  


    // search form inputs
    this.srchForm = new FormGroup({
      college: new FormControl(''),
      department: new FormControl(''),
      term: new FormControl('')
    });

  


  }

  ngAfterViewInit(): void {
    console.log('after init');
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();


  }



  // onChangeCollege
  onChangeCollege(collegeCode) {
    this.departmentFilter.CollegeCode = collegeCode;
    this.DeptartmentService.Filter(this.departmentFilter).subscribe(
      (dep) => (this.departments = dep.List)
    );
  }
  // onChange department
  onChangeDepartments(departmentCode) {
    this.termFilter.DepartmentCode = departmentCode;
    this.TermService.Filter(this.termFilter).subscribe(
      (dep) => (this.terms = dep.List)
    );
  }

  // submit search form
  submit() {
    //this.showTable = false;
    this.rerender();
  }
  // update active

  changeActive(element) {
    element.IsActive = !element.IsActive;
      this.myservice.Update(element).subscribe(() => console.log('data updated'));
      

  }


  StudentEnrollmentView(Crn,College,Department,Term){
         this.Router.navigate(['/admin/StudentEnrollment', Crn,College,Department,Term ])
         
       }

       LectureSchedule(Crn,College,Department,Term,CourseTitleAr,CourseSubject,CourseNumber){
        this.Router.navigate(['/admin/LectureSchedule',Crn,College,Department,Term,CourseTitleAr,CourseSubject,CourseNumber])
        
      }
  }

  


