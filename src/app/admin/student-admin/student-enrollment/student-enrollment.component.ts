
import { StudentAdminService } from './../../../services/admin/Student/studentAdmin.service';
import { StudentAdminFilterModel } from './../../../models/admin/StudentAdmin/StudentAdminFilterModel';
import { StudentEnrollmentservice } from './../../../services/admin/StudentEnrollment/StudentEnrollment.service';
import { DepartmentFilterModel } from './../../../models/Department/DepartmentFilterModel';
import { TermFilterModel } from './../../../models/admin/Term/TermFilterModel';
import { SectionsFilterModel } from './../../../models/Sections/SectionsFilterModel';
import { SectionsService } from './../../../services/admin/Sections/sections.service';
import { DeptartmentService } from './../../../services/deptartment.service';
import { TermService } from './../../../services/admin/Term/term.service';
import { CollegeService } from './../../../services/college.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NotificationService } from './../../../services/genericService/notification.service';
import { DataTableDirective } from 'angular-datatables';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';
import { StudentEnrollmentDTO } from './../../../models/admin/StudentEnrollment/StudentEnrollmentDTO';
import { StudentEnrollmentFilterModel } from './../../../models/admin/StudentEnrollment/StudentEnrollmentFilterModel';
import { Subject } from 'rxjs';

import { AlertDeleteService } from './../../../services/genericService/AlertDelete.service';


@Component({
  selector: 'student-enrollment',
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css']
})
export class StudentEnrollmentComponent implements OnInit {

  // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  // isDtInitialized:boolean = false;


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

btnSearchStudent = false;
btnAddStudent = false;

// dtTrigger
dtOptions: any = {};

colleges: any = [];
departments: any = [];
terms: any = [];
CrnSections: any = [];
elements:any=[];
Students:any=[];
showtable:boolean=false;
srchForm: FormGroup;
StudentEnrollment:FormGroup;

AddSuccessfully:string;
DeleteSuccessfully:string;
updateSuccessfully:string;
MsgDelete:string;

dtTrigger: Subject<StudentEnrollmentDTO> = new Subject();
termFilter: TermFilterModel = new TermFilterModel();

crnFilter:SectionsFilterModel =new SectionsFilterModel();

departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

StudentAdminFilter:StudentAdminFilterModel=new StudentAdminFilterModel();

filter: StudentEnrollmentFilterModel =new StudentEnrollmentFilterModel();


constructor(
private DeptartmentService: DeptartmentService,
private TermService: TermService,
private CollegeService: CollegeService,
private SectionsService:SectionsService,
  private titleService: Title,
  public  translate: TranslateService,
  private notificationService: NotificationService,
  private myService:StudentEnrollmentservice,
  private StudentAdminService:StudentAdminService,
  private formBuilder: FormBuilder,
  private AlertDeleteService:AlertDeleteService,

) { }

  




ngOnInit(): void {

  this.translate.onLangChange
.subscribe((event: LangChangeEvent) => {
if(event.lang == 'ar'){
this.titleService.setTitle("  تسجيل الطالب");
this.AddSuccessfully="تم الاضافة بنجاح";
this.DeleteSuccessfully="تم الحذف بنجاح";
this.updateSuccessfully="تم التحديث بنجاح";
this.MsgDelete=" :هل أنت متأكد من حذف هذا السجل؟ رقم";
this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
}if (event.lang == 'en'){
this.titleService.setTitle(" Student Registration");
this.AddSuccessfully="The Added Was Successfully";
this.DeleteSuccessfully="The Deletion Was Successful";
this.updateSuccessfully="The Spdate was Successful";
this.MsgDelete="Are you sure to delete this record ? Number: ";
this.dtOptions.language.url = `/assets/i18n/English.json`;

}
});



// Get Colleges
this.CollegeService.GetAll().subscribe(
  (coll) => (this.colleges = coll.List)
  );
    // Get Semaster
this.TermService.GetAll().subscribe(
  (coll) => (this.terms = coll.List)
  );


  // search form inputs
  this.srchForm = new FormGroup({
    college: new FormControl(''),
    department: new FormControl(''),
    term: new FormControl(''),
    crnSection: new FormControl(''),
    });

  


    
  //#region  Student Enrollment form inputs
  this.StudentEnrollment = new FormGroup({
    StudentId: new FormControl(''),
    Crn: new FormControl(''),
    TermCode: new FormControl(''),
    });
//#endregion Student Enrollment form inputs



    this.dtOptions = DatatableOptions;

    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
   
      const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
      this.filter.pageIndex = page;
      this.filter.pagelength = dataTablesParameters.length;

      this.filter.CollegeCode = this.srchForm.get('college').value;
      this.filter.DepartmentCode = this.srchForm.get('department').value;
      this.filter.TermCode = this.srchForm.get('term').value;
      this.filter.Crn = this.srchForm.get('crnSection').value;



      this.myService.Filter(this.filter)
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


    

}

initializeFormGroup() {
  this.StudentEnrollment.setValue({
    StudentId: '',
    Crn:this.srchForm.get('crnSection').value,
    TermCode: this.srchForm.get('term').value,
  });
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
    this.crnFilter.DepartmentCode = departmentCode;
    this.crnFilter.CollegeCode = this.srchForm.get('college').value;
    this.crnFilter.TermCode = this.srchForm.get('term').value;

    
    this.SectionsService.Filter(this.crnFilter).subscribe(
      (dep) => (this.CrnSections = dep.List,  console.log( dep))
    );
  }


  get SerachFormErrors() { return this.srchForm.controls; }
  get AddStudentFormErrors() { return this.StudentEnrollment.controls; }


  SubmitFormSearch(){

this.btnSearchStudent=true;

if (this.srchForm.invalid) {
  return;
}else{

   
    this.StudentAdminFilter.DepartmentCode =this.srchForm.get('department').value;
    this.StudentAdminFilter.CollegeCode = this.srchForm.get('college').value;
    this.StudentAdminFilter.StudentStatusCode = "AS";



this.StudentAdminService.Filter(this.StudentAdminFilter)
.subscribe(resp => {
this.Students = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)
});

this.filter.CollegeCode = this.srchForm.get('college').value;
this.filter.DepartmentCode = this.srchForm.get('department').value;
this.filter.TermCode = this.srchForm.get('term').value;
this.filter.Crn = this.srchForm.get('crnSection').value;



this.myService.Filter(this.filter)
  .subscribe(resp => {
    this.elements = resp.List;
    // this.sessionService.Set(resp.List[0]);
    console.log(" before call ", resp)

    this.showtable=true;
    
  });



this.initializeFormGroup();

this.rerender();
  }
}
  submitStudentEnrollment(){
    this.btnAddStudent=true;

    if ( this.StudentEnrollment.invalid) {
      return;
    }else{
    
      if(!this.elements.some((fac) => fac.StudentId == this.StudentEnrollment.get('StudentId').value)){

    this.myService.Insert(this.StudentEnrollment.value)
    .subscribe(res => {

      this.notificationService.success(this.AddSuccessfully);
      this.rerender();

    });



  }else{
    this.notificationService.warn('already exists');
  }
    }
  }
  DeleteStudentEnrollment(ID){
   
    this.AlertDeleteService.openConfirmDialog()
    .afterClosed().subscribe(res =>{
      if(res){
      this.myService.Delete(ID).subscribe(res=>console.log(res));
      this.notificationService.warn(this.DeleteSuccessfully);
      }
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    console.log('after init');
    this.dtTrigger.next();

    this.initializeFormGroup();
  }
  

}
