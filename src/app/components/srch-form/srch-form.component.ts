import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DepartmentFilterModel } from 'src/app/models/Department/DepartmentFilterModel';
import { DeptartmentService } from './../../services/deptartment.service';
import { CollegeService } from './../../services/college.service';

@Component({
  selector: 'srch-form',
  templateUrl: './srch-form.component.html',
  styleUrls: ['./srch-form.component.css']
})
export class SrchFormComponent implements OnInit {

 //

  srchForm: FormGroup;

  departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

  colleges: any = [];
  departments: any = [];

  constructor(private CollegeService: CollegeService, private DeptartmentService: DeptartmentService) { }

  ngOnInit(): void {

   // Get Colleges
   this.CollegeService.GetAll().subscribe(
    (coll) => (this.colleges = coll.List)
  );

  // search form inputs
  this.srchForm = new FormGroup({
    college: new FormControl('', Validators.required),
    department: new FormControl(''),
  });

  }


    // onChangeCollege
    onChangeCollege(collegeCode) {
      this.departmentFilter.CollegeCode = collegeCode;
      this.DeptartmentService.GetAll2(this.departmentFilter).subscribe(dep => this.departments = dep.List);
    }


    submitSrch(){
      console.log('search done');
    }



}
