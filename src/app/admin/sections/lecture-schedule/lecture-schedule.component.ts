import { AlertDeleteService } from './../../../services/genericService/AlertDelete.service';
import { FacultyMemberFilterModel } from './../../../models/admin/FacultyMember/FacultyMemberFilterModel';
import { FacultyMemberService } from './../../../services/admin/facultyMember/faculty-member.service';
import { DeptartmentService } from './../../../services/deptartment.service';
import { TermService } from './../../../services/admin/Term/term.service';
import { CollegeService } from './../../../services/college.service';
import { LectureScheduleService } from './../../../services/admin/LectureSchedule/lecture-schedule.service';
import { LectureScheduleDTO } from './../../../models/admin/LectureSchedule/LectureScheduleDTO';
import { Router, NavigationEnd } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild  , AfterViewInit  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { LectureScheduleFilterModel } from 'src/app/models/admin/LectureSchedule/LectureScheduleFilterModel';
import { FormGroup, FormControl ,Validators, FormBuilder} from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DepartmentFilterModel } from 'src/app/models/Department/DepartmentFilterModel';
import { TermFilterModel } from 'src/app/models/admin/Term/TermFilterModel';
import { SectionsFilterModel } from './../../../models/admin/Sections/SectionsFilterModel';
import { SectionsService } from './../../../services/admin/Sections/sections.service';
import { FacultyMemberEnrollmentService } from './../../../services/admin/facultyMemberEnrollment/faculty-member-enrollment.service';
import { FacultyMemberEnrollmentFilterModel } from './../../../models/admin/FacultyMemberEnrollment/FacultyMemberEnrollmentFilterModel';
import { LectureTypeService } from './../../../services/admin/LectureType/lecture-type.service';
import { ScheduleTypeservice } from './../../../services/admin/ScheduleType/ScheduleType.service';
import { NotificationService } from './../../../services/genericService/notification.service';
import { Location } from '@angular/common';

@Component({
selector: 'lecture-schedule',
templateUrl: './lecture-schedule.component.html',
styleUrls: ['./lecture-schedule.component.css']
})

export class LectureScheduleComponent implements  OnInit   {
control = new FormControl();

// Initialized Table
@ViewChild(DataTableDirective, {static: false})
dtElement: DataTableDirective;
isDtInitialized:boolean = false;


@ViewChild('LectureSchedule') formValues; // Added this
@ViewChild('closeModal') closeModal;

submitted = false;
submitscheduleError=false;
submitEditscheduleError=false;


dtOptions: any = {};
elements;
mySubscription: any;
colleges: any = [];
departments: any = [];
terms: any = [];
CrnSections: any = [];
 FacultyMembers:any=[];
facultyMemberEnrollments:any=[];
ScheduleTypes:any=[];
isDuplicate: boolean;
lectureypes:any=[];
srchForm: FormGroup;
EDitFormLectureSchedule: FormGroup;
FormFacultyMember:FormGroup;
LectureSchedule:FormGroup;
FormGroup;
inputForm: FormGroup;
FacultyMemberId:string;
AddSuccessfully:string;
DeleteSuccessfully:string;
updateSuccessfully:string;
MsgDelete:string;
pageLang = document.documentElement.lang;

dtTrigger: Subject<LectureScheduleDTO> = new Subject();

departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

facultyFilter:FacultyMemberFilterModel=new FacultyMemberFilterModel();

termFilter: TermFilterModel = new TermFilterModel();

crnFilter:SectionsFilterModel =new SectionsFilterModel();

filter: LectureScheduleFilterModel = new LectureScheduleFilterModel();


facultyMemberEnrollmentfilter:FacultyMemberEnrollmentFilterModel =new FacultyMemberEnrollmentFilterModel();




constructor(
private myservice:LectureScheduleService,
private DeptartmentService: DeptartmentService,
private CollegeService: CollegeService,
private FacultyMemberService:FacultyMemberService,
private FacultyMemberEnrollmentService:FacultyMemberEnrollmentService,
private SectionsService:SectionsService,
private ScheduleTypeservice:ScheduleTypeservice,
private TermService: TermService,
private LectureTypeService:LectureTypeService,
private titleService: Title,
public  translate: TranslateService,
private notificationService: NotificationService,
private formBuilder: FormBuilder,
private Router: Router,
private Route: ActivatedRoute,
private AlertDeleteService:AlertDeleteService,


private location: Location

) {



 }



//#region Get info From url
sectionCrn = this.Route.snapshot.paramMap.get('Crn');
College = this.Route.snapshot.paramMap.get('College');
Department = this.Route.snapshot.paramMap.get('Department');
Term = this.Route.snapshot.paramMap.get('Term');
CourseTitleAr = this.Route.snapshot.paramMap.get('CourseTitleAr');
CourseSubject = this.Route.snapshot.paramMap.get('CourseSubject');
CourseNumber = this.Route.snapshot.paramMap.get('CourseNumber');
//#endregion Get info From url


ngOnInit(): void {




// Translate Table (Ar & En)
this.translate.onLangChange
.subscribe((event: LangChangeEvent) => {
if(event.lang == 'ar'){
this.pageLang = event.lang;

this.titleService.setTitle(" ادارة مواعيد المحاضرات");
this.AddSuccessfully="تم الاضافة بنجاح";
this.DeleteSuccessfully="تم الحذف بنجاح";
this.updateSuccessfully="تم التحديث بنجاح";
this.MsgDelete=" :هل أنت متأكد من حذف هذا السجل؟ رقم";
//this.dtOptions.language.url = `/assets/i18n/Arabic.json`;

}if (event.lang == 'en'){
this.titleService.setTitle(" Session Time Management");
this.AddSuccessfully="The Added Was Successfully";
this.DeleteSuccessfully="The Deletion Was Successful";
this.updateSuccessfully="The Spdate was Successful";
this.MsgDelete="Are you sure to delete this record ? Number: ";
this.pageLang = event.lang;
this.dtOptions.language.url = `/assets/i18n/English.json`;

}
});

  //this.refresh();
//#region Translate Table (Ar & En)


//#endregion Translate Table (Ar & En)

//#region Get FacultyMember
this.facultyFilter.CollegeCode=this.College;
this.facultyFilter.DepartmentCode=this.Department;
//#endregion Get FacultyMember

//#region Faculty MemberS Filter
this.FacultyMemberService.Filter(this.facultyFilter).subscribe(
(coll) =>{
(this.FacultyMembers = coll.List)
console.log(this.FacultyMembers);
});
//#endregion Faculty MemberS Filter

//#region Get All Colleges
this.CollegeService.GetAll().subscribe(
(coll) => (this.colleges = coll.List)
);
//#endregion Get All Colleges

//#region  Get All departments

this.departmentFilter.CollegeCode=this.College;
this.DeptartmentService.Filter(this.departmentFilter).subscribe(
(coll) => (this.departments = coll.List)
);
//#endregion Get All departments

//#region  Get All Semaster
this.termFilter.DepartmentCode = this.Department;
this.TermService.Filter(this.termFilter).subscribe(
(dep) => (this.terms = dep.List)
);
//#endregion Get All Semaster

//#region  Get Section CRn By Fliter
this.crnFilter.CollegeCode=this.College;
this.crnFilter.DepartmentCode=this.Department;
this.crnFilter.TermCode=this.Term;

this.SectionsService.Filter(this.crnFilter).subscribe(
(dep) => (this.CrnSections = dep.List));
//#endregion Get Section CRn By Fliter

//#region  Get All LectureType
this.LectureTypeService.GetAll().subscribe(
  (coll) => (this.lectureypes = coll.List));
//#endregion Get All LectureType


//#region  Definition search form inputs
this.srchForm = new FormGroup({
college: new FormControl(this.College),
department: new FormControl(this.Department),
term: new FormControl(this.Term),
crnSection: new FormControl(this.sectionCrn)
});
//#endregion Definition search form inputs

 //#region Definition input Form Insert LectureSchedule
this.LectureSchedule = this.formBuilder.group({
  FacultyMemberId: ['',Validators.required],
  LectureTypeCode: ['',Validators.required],
  StartTime: ['',Validators.required],
  EndTime: ['',Validators.required],
  RoomCode: ['',Validators.required],
  ScheduleTypeCode:['',Validators.required],
  Saturday: new FormControl(''),
  Sunday: new FormControl(''),
  Monday: new FormControl(''),
  Tuesday: new FormControl(''),
  Wensday: new FormControl(''),
  Thursday: new FormControl(''),
  Crn: new FormControl(this.Route.snapshot.paramMap.get('Crn')),
  TermCode: new FormControl(this.Route.snapshot.paramMap.get('Term')),
  });
 //#endregion Definition input Form Insert LectureSchedule

 //#region Definition input Form Edit LectureSchedule
  this.EDitFormLectureSchedule = this.formBuilder.group({

    FacultyMemberIds: ['',Validators.required],
    LectureTypeCodes: ['',Validators.required],
    StartTimes:['',Validators.required],
    EndTimes: ['',Validators.required],
    RoomCodes:['',Validators.required],
    ScheduleTypeCodes: ['',Validators.required],
    Saturdays: new FormControl(''),
    Sundays: new FormControl(''),
    Mondays: new FormControl(''),
    Tuesdays: new FormControl(''),
    Wensdays: new FormControl(''),
    Thursdays: new FormControl(''),

    Crns: new FormControl(this.Route.snapshot.paramMap.get('Crn')),
    TermCodes: new FormControl(this.Route.snapshot.paramMap.get('Term')),


    });
 //#endregion Definition input Form Edit LectureSchedule

 //#region Definition input Form Insert FormFacultyMember

this.FormFacultyMember = this.formBuilder.group({
  FacultyMemberId: ['',Validators.required],
  Crn: new FormControl(this.Route.snapshot.paramMap.get('Crn')),
  TermCode: new FormControl(this.Route.snapshot.paramMap.get('Term')),
  CourseSubject: new FormControl(this.Route.snapshot.paramMap.get('CourseSubject')),
  CourseNumber: new FormControl(this.Route.snapshot.paramMap.get('CourseNumber')),
  });

 //#endregion Definition input Form Insert FormFacultyMember

 this.filter.TermCode =this.Route.snapshot.paramMap.get('Term');
 this.filter.Crn = this.Route.snapshot.paramMap.get('Crn');
 this.myservice.Filter(this.filter)
 .subscribe(resp => {
 this.elements = resp.List;
 console.log("view-Table-LectureSchedule", resp)
 });

}

get FacultyErrors() { return this.FormFacultyMember.controls; }
get LectureScheduleErrors() { return this.LectureSchedule.controls; }
get EditLectureScheduleErrors() { return this.EDitFormLectureSchedule.controls; }

//#region Insert FacultyMember Insert and updata table FacultyMember

submitFormFacultyMember(){
  this.submitted = true;
  if(!this.facultyMemberEnrollments.some((fac) => fac.FacultyMemberId == this.FormFacultyMember.get('FacultyMemberId').value)){
    this.FacultyMemberEnrollmentService.Insert(this.FormFacultyMember.value)
    .subscribe(
      res => {
        this.notificationService.success(this.AddSuccessfully);
        //updata table FormFacultyMember
    this.facultyMemberEnrollmentfilter.Crn=this.sectionCrn;
    this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
    .subscribe(resp => {
    this.facultyMemberEnrollments = resp.List;
    console.log('resp after enrolment: ', resp.List);
    });
  });
  }else{
    this.notificationService.warn('already exists');
  }
  }
//#endregion  Insert FacultyMember Insert and updata table FacultyMember

//#region Delete FacultyMember  and updata table FacultyMember

DeletefacultyMemberEnrollment(facultyMemberEnrollmentID){

  this.AlertDeleteService.openConfirmDialog()
  .afterClosed().subscribe(res =>{
    if(res){

this.FacultyMemberEnrollmentService.Delete(facultyMemberEnrollmentID).subscribe(res=>console.log("Delete-facultyMember ",res));

this.notificationService.warn(this.DeleteSuccessfully);
}
//updata table FacultyMember
this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
.subscribe(resp => {
this.facultyMemberEnrollments = resp.List;
console.log("Updata-Table-FacultyMember", resp) });
});


};

//#endregion Delete FacultyMember  and updata table FacultyMember


//#region insert LectureSchedule  and updata table LectureSchedule
submitLectureSchedule(){
  this.submitscheduleError=true;

  if (this.LectureSchedule.invalid) {
    return;
  }else{
  this.myservice.Insert(this.LectureSchedule.value)
  .subscribe(res=>console.log("Insert-LectureSchedule",res));
  this.closeModal.nativeElement.click();
  this.notificationService.success(this.AddSuccessfully);

//updata table LectureSchedule
this.filter.TermCode = this.srchForm.get('term').value;
this.filter.Crn = this.Route.snapshot.paramMap.get('Crn');
this.myservice.Filter(this.filter)
.subscribe(resp => {
this.elements = resp.List;
console.log("Updata-Table-LectureSchedule", resp)
});

//this.formValues.resetForm();
  }
}
//#endregion insert LectureSchedule  and updata table LectureSchedule



EditLectureSchedule(LectureScheduleID){


  this.myservice.GetById(LectureScheduleID)
  .subscribe(res=>{

    this.EDitFormLectureSchedule.patchValue({

      FacultyMemberIds: res.FacultyMemberId,
       LectureTypeCodes: res.LectureTypeCode,
       StartTimes: res.StartTime,
       EndTimes: res.EndTime,
       RoomCodes: res.RoomCode,
       ScheduleTypeCodes: res.ScheduleTypeCode,
       Saturdays:res.Saturday,
       Sundays: res.Sunday,
       Mondays: res.Monday,
       Tuesdays: res.Tuesday,
       Wensdays: res.Wensday,
       Thursdays: res.Thursday,
       Crns: res.Crn,
       TermCodes:res.TermCode,

         })
    console.log(res)
  });

}

EditsubmitLectureSchedule(element){

  this.submitEditscheduleError = true;
  if ( this.EDitFormLectureSchedule.invalid) {
    return;
  }else{

  element.FacultyMemberId=this.EDitFormLectureSchedule.get('FacultyMemberIds').value;
  element.LectureTypeCode=this.EDitFormLectureSchedule.get('LectureTypeCodes').value;
  element.StartTime=this.EDitFormLectureSchedule.get('StartTimes').value;
  element.EndTime=this.EDitFormLectureSchedule.get('EndTimes').value;
  element.RoomCode=this.EDitFormLectureSchedule.get('RoomCodes').value;
  element.ScheduleTypeCode=this.EDitFormLectureSchedule.get('ScheduleTypeCodes').value;
  element.Saturday=this.EDitFormLectureSchedule.get('Saturdays').value;
  element.Sunday=this.EDitFormLectureSchedule.get('Sundays').value;
  element.Monday=this.EDitFormLectureSchedule.get('Mondays').value;
  element.Tuesday=this.EDitFormLectureSchedule.get('Tuesdays').value;
  element.Wensday=this.EDitFormLectureSchedule.get('Wensdays').value;
  element.Thursday=this.EDitFormLectureSchedule.get('Thursdays').value;
  element.Crn=this.EDitFormLectureSchedule.get('Crns').value;
  element.TermCode=this.EDitFormLectureSchedule.get('TermCodes').value;

  this.myservice.Update(element).subscribe(res =>
    {
      console.log('update data: ', res);

    }

    );
    this.notificationService.success(this.updateSuccessfully);

    this.filter.TermCode = this.EDitFormLectureSchedule.get('TermCodes').value;
    this.filter.Crn =this.EDitFormLectureSchedule.get('Crns').value;




    this.myservice.Filter(this.filter)
    .subscribe(resp => {
    this.elements = resp.List;
    // this.sessionService.Set(resp.List[0]);
    console.log(" before call ", resp)
    });
  }
}


DeleteLectureSchedule(LectureScheduleID){

    this.AlertDeleteService.openConfirmDialog()
    .afterClosed().subscribe(res =>{
      if(res){
  this.myservice.Delete(LectureScheduleID).subscribe(res=>console.log(res));
  this.notificationService.warn(this.DeleteSuccessfully);
      }
      this.filter.TermCode = this.srchForm.get('term').value;
this.filter.Crn = this.Route.snapshot.paramMap.get('Crn');



//this.filter.Crn=this.sectionCrn;

this.myservice.Filter(this.filter)
.subscribe(resp => {
this.elements = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)
});
    })




}



ngAfterViewInit(): void {


this.ScheduleTypeservice.GetAll().subscribe(res=>{
  this.ScheduleTypes=res.List;
  console.log(res);
})


this.facultyMemberEnrollmentfilter.Crn=this.sectionCrn;


this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
.subscribe(resp => {
this.facultyMemberEnrollments = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)

});


}

ngOnDestroy(): void {
// Do not forget to unsubscribe the event
this.dtTrigger.unsubscribe();

if (this.mySubscription) {
  this.mySubscription.unsubscribe();
}


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


this.filter.TermCode = this.srchForm.get('term').value;
this.filter.Crn = this.Route.snapshot.paramMap.get('Crn');



//this.filter.Crn=this.sectionCrn;

this.myservice.Filter(this.filter)
.subscribe(resp => {
this.elements = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)




});


this.facultyMemberEnrollmentfilter.Crn=this.sectionCrn;


this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
.subscribe(resp => {
this.facultyMemberEnrollments = resp.List;
// this.sessionService.Set(resp.List[0]);
console.log(" before call ", resp)

})

}



refresh(): void {
  this.Router.navigateByUrl("admin/StudentEnrollment", { skipLocationChange: true }).then(() => {
    this.Router.navigate([decodeURI(this.location.path())]);
  })
}
}
