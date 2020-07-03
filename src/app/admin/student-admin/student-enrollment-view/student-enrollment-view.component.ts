import { generalAlertservice } from './../../../services/genericService/generalAlert.service';
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
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NotificationService } from './../../../services/genericService/notification.service';
import { DataTableDirective } from 'angular-datatables';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';
import { StudentEnrollmentDTO } from './../../../models/admin/StudentEnrollment/StudentEnrollmentDTO';
import { StudentEnrollmentFilterModel } from './../../../models/admin/StudentEnrollment/StudentEnrollmentFilterModel';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlertDeleteService } from './../../../services/genericService/AlertDelete.service';



@Component({
selector: 'student-enrollment-view',
templateUrl: './student-enrollment-view.component.html',
styleUrls: ['./student-enrollment-view.component.css']
})
export class StudentEnrollmentViewComponent implements OnInit {
    // Initialized Table
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    // isDtInitialized:boolean = false;
    panelOpenState = false;
  
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
  // dtTrigger
dtOptions: any = {};
btnAddStudent=false;
colleges: any = [];
departments: any = [];
terms: any = [];
CrnSections: any = [];
elements:any=[];
Students:any=[];
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
private Route: ActivatedRoute,
public  translate: TranslateService,
private notificationService: NotificationService,
private myService:StudentEnrollmentservice,
private StudentAdminService:StudentAdminService,
private AlertDeleteService:AlertDeleteService,
private generalAlertservice:generalAlertservice,
//private ref: ChangeDetectorRef,
) { 
 //ref.detectChanges();
}

//#region Get info From url 
sectionCrn = this.Route.snapshot.paramMap.get('Crn');
College = this.Route.snapshot.paramMap.get('College');
Department = this.Route.snapshot.paramMap.get('Department');
Term = this.Route.snapshot.paramMap.get('Term');

//#endregion Get info From url 


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
  // search form inputs
  this.srchForm = new FormGroup({
    college: new FormControl(this.College),
    department: new FormControl(this.Department),
    term: new FormControl(this.Term),
    crnSection: new FormControl(this.sectionCrn)
    });

  //#region  Student Enrollment form inputs
  this.StudentEnrollment = new FormGroup({
    StudentId: new FormControl(''),
    Crn: new FormControl(this.sectionCrn),
    TermCode: new FormControl(this.Department),
    });
//#endregion Student Enrollment form inputs


// Get Colleges
this.CollegeService.GetAll().subscribe(
  (coll) => (this.colleges = coll.List)
  );
    // Get Semaster
this.TermService.GetAll().subscribe(
  (coll) => (this.terms = coll.List)
  );

  
this.dtOptions = DatatableOptions;

this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
  const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
  this.filter.pageIndex = page;
  this.filter.pagelength = dataTablesParameters.length;



  this.filter.CollegeCode = this.College;
  this.filter.DepartmentCode = this.Department;
  this.filter.TermCode = this.Term;
  this.filter.Crn = this.sectionCrn;



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








this.StudentAdminFilter.DepartmentCode =this.Department;
this.StudentAdminFilter.CollegeCode = this.College;
this.StudentAdminFilter.StudentStatusCode="AS";


    this.StudentAdminService.Filter(this.StudentAdminFilter)
.subscribe(resp => {
this.Students = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)
});

}





ngAfterViewInit(): void {
  console.log('after init');
  this.dtTrigger.next();
  this.initializeFormGroup();
  this.departmentList();
  this.CrnSectionssList();
  

}

initializeFormGroup() {
  this.StudentEnrollment.setValue({
    StudentId: '',
    Crn:this.sectionCrn,
    TermCode: this.Term,
  });
}



// departmentFilter
departmentList() {
  this.departmentFilter.CollegeCode = this.College,
  this.DeptartmentService.Filter(this.departmentFilter).subscribe(
    (dep) => (this.departments = dep.List)
  );
}
//  CrnSections
CrnSectionssList() {
  
  this.crnFilter.DepartmentCode = this.Department,
  this.crnFilter.CollegeCode = this.College,
  this.crnFilter.TermCode =this.Term;
  this.SectionsService.Filter(this.crnFilter).subscribe(
    (dep) => (this.CrnSections = dep.List,  console.log( dep))
  );
}
get AddStudentFormErrors() { return this.StudentEnrollment.controls; }

submitStudentEnrollment(){
  this.btnAddStudent=true;

  if ( this.StudentEnrollment.invalid) {
    return;
  }else{
  

    if(!this.elements.some((fac) => fac.StudentId == this.StudentEnrollment.get('StudentId').value)){

  this.myService.Insert(this.StudentEnrollment.value)
  .subscribe(res=> this.generalAlertservice.openAlertSuccess() );
 
  this.AlertDeleteService.openConfirmDialog()
  
  this.rerender();
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

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();


  }
  

}
