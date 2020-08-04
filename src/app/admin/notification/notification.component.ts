import { DeptartmentService } from './../../services/deptartment.service';
import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';

import { CollegeService } from './../../services/college.service';

import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  srchForm:FormGroup;
  colleges: any = [];
  departments: any = [];



  dtTrigger: any;
  
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

    // Translate Table (Ar & En)
    this.subscription = this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.titleService.setTitle("نسبة الغياب");
   
     }if (event.lang == 'en'){

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
   // this.dtTrigger.unsubscribe();


  }
}
