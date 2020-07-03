import { Router } from '@angular/router';
import { StudentRelativeRelationService } from './../../services/admin/studentRelativeRelation/student-relative-relation.service';
import { StudentRelativeRelationDTO } from './../../models/admin/studentRelativeRelation/studentRelativeRelationDTO';
import { element } from 'protractor';
import { StudentAdminFilterModel } from './../../models/admin/StudentAdmin/StudentAdminFilterModel';
import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';
import { DeptartmentService } from './../../services/deptartment.service';
import { CollegeService } from './../../services/college.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { StudentAdminDTO } from 'src/app/models/admin/StudentAdmin/StudentAdminDTO';
import { StudentAdminService } from 'src/app/services/admin/Student/studentAdmin.service';

import { NationalitiesService } from 'src/app/services/admin/Nationalities/nationalities.service';
import { Title } from '@angular/platform-browser';
import { errorHandling } from 'src/app/globals';


@Component({
  selector: 'student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.css']
})
export class StudentAdminComponent implements OnInit {

 // Initialized Table
 @ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 isDtInitialized:boolean = false;

 // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 // We use this trigger because fetching the list can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<StudentAdminDTO> = new Subject();

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

 filter: StudentAdminFilterModel = new StudentAdminFilterModel();

 departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

 elements: StudentAdminDTO[];

 colleges: any = [];
 departments: any = [];

 srchForm: FormGroup;
 editForm: FormGroup;

 pageLang = document.documentElement.lang;

 nationalities: any = [];
 relations: StudentRelativeRelationDTO[];

 constructor( private myService: StudentAdminService,
              private CollegeService: CollegeService,
              private DeptartmentService: DeptartmentService,
               public  translate: TranslateService,
               private NationalitiesService: NationalitiesService,
               private titleService: Title,
               private StudentRelativeRelationService: StudentRelativeRelationService,
               public Router: Router
               ) {}


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
        console.log(" before call ", resp.List);
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
        this.titleService.setTitle(" إدارة بيانات الطلاب");
        this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
        this.rerender();
       }if (event.lang == 'en'){
        this.titleService.setTitle("  Manage Student Data");
        this.pageLang = event.lang;
        this.dtOptions.language.url = `/assets/i18n/English.json`;
        this.rerender();
       }
      });

  // Get Colleges
  this.CollegeService.GetAll().subscribe(
    (coll) => (this.colleges = coll.List)
  );

  // search form inputs
  this.srchForm = new FormGroup({
    college: new FormControl('', Validators.required),
    department: new FormControl(''),
  });

  this.editForm = new FormGroup({
    NameAr: new FormControl('', Validators.required),
    NameEn: new FormControl(''),
    Email: new FormControl('', [Validators.required, Validators.email]),
    NationalId: new FormControl('', Validators.required),
    Nationality: new FormControl('', Validators.required),
    Gender: new FormControl(''),
    DateOfBirth: new FormControl(''),
    MobileNumber: new FormControl('', Validators.required),
    AlternativeEmail: new FormControl('', [Validators.required, Validators.email]),
    AcademicStatus: new FormControl('', Validators.required),
    GuardianName: new FormControl(''),
    StudentRelativeRelation: new FormControl(''),
    GuardianMobileNumber: new FormControl(''),
    GuardianEmail: new FormControl('')
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



// Get By Id
showMod(studentId){

  forkJoin([
    this.NationalitiesService.GetAll(),
    this.StudentRelativeRelationService.GetAll(),
    this.myService.GetById(studentId)
  ]).subscribe(res => {
    this.nationalities = res[0].List;
    this.relations = res[1].List;

    this.editForm.patchValue({
            NameAr: res[2].NameAr,
            NameEn: res[2].NameEn,
            Email: res[2].Email,
            NationalId: res[2].NationalId,
            Nationality: res[2].NationalityCode,
            Gender: res[2].Gender,
            DateOfBirth: res[2].DateOfBirth,
            MobileNumber: res[2].MobileNumber,
            AlternativeEmail: res[2].AlternativeEmail,
            AcademicStatus: res[2].AcademicStatus,
            GuardianName: res[2].GuardianName,
            StudentRelativeRelation: res[2].RelativeRelationId,
            GuardianMobileNumber: res[2].GuardianMobileNumber,
            GuardianEmail: res[2].GuardianEmail
          });
        });

}



// submit search form

submit() {
  this.rerender();
}


// Edit
edit(element){
  element.NameAr = this.editForm.get('NameAr').value;
  element.NameEn = this.editForm.get('NameEn').value;
  element.Email = this.editForm.get('Email').value;
  element.NationalId = this.editForm.get('NationalId').value;
  element.NationalityCode = this.editForm.get('Nationality').value;
  element.Gender = this.editForm.get('Gender').value;
  element.DateOfBirth = this.editForm.get('DateOfBirth').value;
  element.MobileNumber = this.editForm.get('MobileNumber').value;
  element.AlternativeEmail = this.editForm.get('AlternativeEmail').value;
  element.AcademicStatus = this.editForm.get('AcademicStatus').value;
  element.GuardianName = this.editForm.get('GuardianName').value;
  element.RelativeRelationId = this.editForm.get('StudentRelativeRelation').value;
  element.GuardianMobileNumber = this.editForm.get('GuardianMobileNumber').value;
  element.GuardianEmail = this.editForm.get('GuardianEmail').value;
  this.myService.Update(element).subscribe(res =>
    {
      console.log('update data: ', res);
      this.rerender();
    }
    );
}



}
