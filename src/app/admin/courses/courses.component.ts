import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';
import { DeptartmentService } from './../../services/deptartment.service';
import { CollegeService } from './../../services/college.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { CourseDTO } from 'src/app/models/Course/CourseDTO';
import { CourseService } from 'src/app/services/course.service';
import { CourseFilterModel } from 'src/app/models/Course/CourseFilterModel';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { errorHandling } from 'src/app/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

 // Initialized Table
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 isDtInitialized:boolean = false;

 // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 // We use this trigger because fetching the list can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<CourseDTO> = new Subject();

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

 filter: CourseFilterModel = new CourseFilterModel();

 departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

 elements: CourseDTO[];

 elementsFiltered: CourseDTO[];

 colleges: any = [];
 departments: any = [];

 srchForm: FormGroup;
 editForm: FormGroup;

 pageLang = document.documentElement.lang;

 constructor( private myService: CourseService, private CollegeService: CollegeService, private DeptartmentService: DeptartmentService, public  translate: TranslateService, public Router: Router ) {}


  ngOnInit(): void {

    this.dtOptions = DatatableOptions;

    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
      this.filter.pageIndex = page;
      this.filter.pagelength = dataTablesParameters.length;

      // custom filters
      this.filter.CollegeCode = this.srchForm.get('college').value;
      this.filter.DepartmentCode = this.srchForm.get('department').value;

      this.myService.Filter(this.filter)
        .subscribe(resp => {
          this.elements = resp.List;
          console.log(" before call ", resp);
          callback({
            data: [],
            recordsTotal: resp.ResultPaging.RecordsTotal,
            recordsFiltered: resp.ResultPaging.RecordsFiltered
          });
        },
        err => errorHandling(err, this.Router.navigate(['login']))
        );
    };

        // Translate Table (Ar & En)
        this.translate.onLangChange
        .subscribe((event: LangChangeEvent) => {
         if(event.lang == 'ar'){
          this.pageLang = event.lang;
          this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
          this.rerender();
         }if (event.lang == 'en'){
          this.pageLang = event.lang;
          this.dtOptions.language.url = `/assets/i18n/English.json`;
          this.rerender();
         }
        });

    // Get Colleges
    this.CollegeService.GetAll().subscribe(
      (coll) => (this.colleges = coll.List),
      err => errorHandling(err, this.Router.navigate(['login']))
    );

    // search form inputs
    this.srchForm = new FormGroup({
      college: new FormControl('', Validators.required),
      department: new FormControl(''),
    });

    this.editForm = new FormGroup({
      nameAr: new FormControl('', Validators.required),
      nameEn: new FormControl('', Validators.required),
      totalHours: new FormControl('', Validators.required),
      theoreticalHours: new FormControl('', Validators.required),
      exercisesHours: new FormControl('', Validators.required),
      practicalityHours: new FormControl('', Validators.required)
    });

  }

  ngAfterViewInit(): void {
    console.log('after init');
    this.dtTrigger.next();
  }


  // update active
  changeActive(element) {
    element.IsActive = !element.IsActive;
    this.myService.Update(element).subscribe(() => console.log('data updated'));
  }

  // onChangeCollege
  onChangeCollege(collegeCode) {
    this.departmentFilter.CollegeCode = collegeCode;
    if(collegeCode){
      this.DeptartmentService.Filter(this.departmentFilter).subscribe(
      dep => {
        this.departments = dep.List;
      }
    )
    }else{
      this.departments = null;
    }
  }

  showMod(courseId){
    this.myService.GetById(courseId).subscribe(res => {
      this.editForm.patchValue({
        nameAr: res.NameAr,
        nameEn: res.NameEn,
        totalHours: res.TotalHours,
        theoreticalHours: res.TheoreticalHours,
        exercisesHours: res.ExercisesHours,
        practicalityHours: res.PracticalityHours
      });
    });
  }

  // submit search form
  submit() {
    this.rerender();
  }


  // Edit
  edit(element){
    element.nameAr = this.editForm.get('nameAr').value;
    element.nameEn = this.editForm.get('nameEn').value;
    element.totalHours = this.editForm.get('totalHours').value;
    element.theoreticalHours = this.editForm.get('theoreticalHours').value;
    element.exercisesHours = this.editForm.get('exercisesHours').value;
    element.practicalityHours = this.editForm.get('practicalityHours').value;
    this.myService.Update(element).subscribe(res =>
      {
        this.rerender();
      }
      );
  }

}
