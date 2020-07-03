import { Ahmedrender } from './../uitest/ahmedrender';
import { AhmedRerenderService } from './../uitest/ahmed-rerender.service';
import { DeptartmentService } from './../services/deptartment.service';
import { CollegeService } from './../services/college.service';
import { Component, OnInit} from '@angular/core';
import { MajorService } from '../services/major.service';
import { MajorFilterModel } from '../models/Major/MajorFilterModel';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { DepartmentFilterModel } from '../models/Department/DepartmentFilterModel';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  headElements = ['اسم التخصص', 'القسم', 'الكلية', 'الكود'];
  elements: any[];

  // ahmRen = new Ahmedrender();

  colleges: any = [];
  departments: any = [];

  filter: MajorFilterModel = new MajorFilterModel();

  departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

 ajaxFunc = (dataTablesParameters: any, callback) => {
  const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
  this.filter.pageIndex = page;
  this.filter.pagelength = dataTablesParameters.length;

  // Custom Filters Here
  this.filter.CollegeCode = this.srchForm.get('college').value;
  this.filter.DepartmentCode = this.srchForm.get('department').value;

  this.myService.GetAll2(this.filter)
    .subscribe(resp => {
      this.elements = resp.List;
      // this.sessionService.Set(resp.List[0]);
      console.log(" before call ", resp)
      callback({
        data: [],
        recordsTotal: resp.ResultPaging.RecordsTotal,
        recordsFiltered: resp.ResultPaging.RecordsFiltered
      });
    });
};


  srchForm: FormGroup;




  constructor(private myService: MajorService, private CollegeService: CollegeService, private DeptartmentService: DeptartmentService, public AhmedRerenderService: AhmedRerenderService) { }

  ngOnInit(): void {

    // Get Colleges
    this.CollegeService.GetAll().subscribe(
      (coll) => (this.colleges = coll.List)
    );

      // search form inputs
      this.srchForm = new FormGroup({
        college: new FormControl('', Validators.required),
        department: new FormControl('')
      });

  }



  // onChangeCollege
  onChangeCollege(collegeCode) {
    this.departmentFilter.CollegeCode = collegeCode;
    this.DeptartmentService.GetAll2(this.departmentFilter).subscribe(dep => this.departments = dep.List);
  }


  // submit search form
  submitSrch() {
    // this.rerender();
    console.log('submit search done');
  }




}
