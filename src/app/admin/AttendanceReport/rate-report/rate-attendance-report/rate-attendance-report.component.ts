import { CollegeService } from './../../../../services/college.service';
import { DeptartmentService } from './../../../../services/deptartment.service';
import { DepartmentFilterModel } from './../../../../models/Department/DepartmentFilterModel';



import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription, Subject } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';
import { GetAttendanceRateReportDTO } from 'src/app/models/admin/AttendanceReports/GetAttendanceRateReportDTO';


@Component({
  selector: 'rate-report',
  templateUrl: './rate-attendance-report.component.html',
  styleUrls: ['./rate-attendance-report.component.css']
})

export class RateAttendanceReportComponent implements OnInit {
  srchForm:FormGroup;
  colleges: any = [];
  departments: any = [];

   // Initialized Table
   @ViewChild(DataTableDirective, {static: false})
   dtElement: DataTableDirective;
   isDtInitialized:boolean = false;
 
 // Must be declared as "any", not as "DataTables.Settings"


 dtTrigger: Subject<GetAttendanceRateReportDTO> = new Subject();

   // We use this trigger because fetching the list can be quite long,
   // thus we ensure the data is fetched before rendering
   dtOptions: any = {};


 
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
 
  constructor(

    public  translate: TranslateService,
    private titleService: Title,

    private DeptartmentService: DeptartmentService,
    private CollegeService: CollegeService,


  ) { }

  subscription: Subscription;
  subscriptionb: Subscription;
  departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();
  ngOnInit(): void {
    this.dtOptions = DatatableOptionsClient;
    // Translate Table (Ar & En)
    this.subscription = this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
      this.titleService.setTitle("نسبة الغياب");
   
     }if (event.lang == 'en'){
      this.dtOptions.language.url = `/assets/i18n/English.json`;

      this.titleService.setTitle("Rate Report");
     }
    });

 // search form inputs
 this.srchForm = new FormGroup({
  college: new FormControl(''),
  department: new FormControl('')
});
  // Get Colleges
  this.CollegeService.GetAll().subscribe(
    (coll) => (this.colleges = coll.List)
  );


}

  // onChangeCollege
  onChangeCollege(collegeCode) {
    this.departmentFilter.CollegeCode = collegeCode;
    this.DeptartmentService.Filter(this.departmentFilter).subscribe(
      (dep) => (this.departments = dep.List)
    );
  }
  submit(){

  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
    this.subscriptionb.unsubscribe();
  }

}
