import { FacultyMemberFilterModel } from './../../../models/admin/FacultyMember/FacultyMemberFilterModel';
import { FacultyMemberService } from './../../../services/admin/facultyMember/faculty-member.service';
import { DeptartmentService } from './../../../services/deptartment.service';
import { TermService } from './../../../services/admin/Term/term.service';
import { CollegeService } from './../../../services/college.service';
import { LectureScheduleService } from './../../../services/admin/LectureSchedule/lecture-schedule.service';
import { LectureScheduleDTO } from './../../../models/admin/LectureSchedule/LectureScheduleDTO';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild , AfterViewInit, ElementRef  } from '@angular/core';
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
import { AlertDeleteService } from './../../../services/genericService/AlertDelete.service';

@Component({
  selector: 'lecture-schedule-view',
  templateUrl: './lecture-schedule-view.component.html',
  styleUrls: ['./lecture-schedule-view.component.css']
})
export class LectureScheduleViewComponent implements OnInit {

  control = new FormControl();



  // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;


  @ViewChild("SpanCourseNumber") CourseNumber: ElementRef;
  @ViewChild("SpanCourseSubject") CourseSubject: ElementRef;
  @ViewChild('closeModal') closeModal;
  @ViewChild('modelLectureSchedule') modelLectureSchedule;


  submitted = false;
  submitsearchError=false;
  submitscheduleError=false;
  submitEditscheduleError=false;


  dtOptions: any = {};
  elements;
facultyid:number;
  colleges: any = [];
  departments: any = [];
  terms: any = [];
  CrnSections: any = [];
  srchForm: FormGroup;

  FacultyMembers:any=[];
  facultyMemberEnrollments:any=[];
  ScheduleTypes:any=[];

  lectureypes:any=[];

  FormFacultyMember:FormGroup;
  LectureSchedule:FormGroup;
  EDitFormLectureSchedule: FormGroup;
  FormGroup;
  inputForm: FormGroup;
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
  private TermService: TermService,
  private CollegeService: CollegeService,
  private SectionsService:SectionsService,

  private FacultyMemberService:FacultyMemberService,
  private FacultyMemberEnrollmentService:FacultyMemberEnrollmentService,

  private ScheduleTypeservice:ScheduleTypeservice,

  private LectureTypeService:LectureTypeService,
  private titleService: Title,
  private Router: Router,
  private Route: ActivatedRoute,
  public  translate: TranslateService,
  private notificationService: NotificationService,
  private formBuilder: FormBuilder,
  private location: Location,
  private AlertDeleteService:AlertDeleteService,
  ) {



  }
  /*
  resetFormsrchForm(){
    this.srchForm.reset({
      term: '',
      college: '',
      department: '',
      crnSection: '',
    });
    }
*/


  resetFormLectureSchedule(){
  this.LectureSchedule.reset({
  FacultyMemberId: '',
  LectureTypeCode: '',
  StartTime: '',
  EndTime: '',
  RoomCode: '',
  ScheduleTypeCode: '',
  Saturday: false,
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wensday: false,
  Thursday: false,
  });
  }


  ngAfterViewInit(): void {
this.refresh();
  }


  ngOnInit(): void {
  // Translate Table (Ar & En)


// Translate Table (Ar & En)
this.translate.onLangChange
.subscribe((event: LangChangeEvent) => {
if(event.lang == 'ar'){
this.titleService.setTitle(" ادارة مواعيد المحاضرات");
this.AddSuccessfully="تم الاضافة بنجاح";
this.DeleteSuccessfully="تم الحذف بنجاح";
this.updateSuccessfully="تم التحديث بنجاح";
this.MsgDelete=" :هل أنت متأكد من حذف هذا السجل؟ رقم";
this.pageLang = event.lang;
}if (event.lang == 'en'){

this.titleService.setTitle(" Session Time Management");
this.AddSuccessfully="The Added Was Successfully";
this.DeleteSuccessfully="The Deletion Was Successful";
this.updateSuccessfully="The Spdate was Successful";
this.MsgDelete="Are you sure to delete this record ? Number: ";
this.pageLang = event.lang;
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


  this.LectureTypeService.GetAll().subscribe(
    (coll) => (this.lectureypes = coll.List)
    );
    this.ScheduleTypeservice.GetAll().subscribe(res=>{
      this.ScheduleTypes=res.List;
      console.log(res);
    });

// FormFacultyMember inputs

this.FormFacultyMember = this.formBuilder.group({
  FacultyMemberId:['', Validators.required],
  Crn: new FormControl(),
  TermCodes: new FormControl(),
 CourseSubject: new FormControl(),
  CourseNumber: new FormControl(),
  });


    // search form inputs
this.srchForm = this.formBuilder.group({
  college: ['',Validators.required],
  department: ['',Validators.required],
  term:['',Validators.required],
  crnSection: ['',Validators.required],
  });



// LectureSchedule inputs

this.LectureSchedule = this.formBuilder.group({

  FacultyMemberId: ['',Validators.required],
  LectureTypeCode: ['',Validators.required],
  StartTime:['',Validators.required],
  EndTime: ['',Validators.required],
  RoomCode: ['',Validators.required],
  ScheduleTypeCode: ['',Validators.required],

  
  Saturday: new FormControl(''),
  Sunday: new FormControl(''),
  Monday: new FormControl(''),
  Tuesday: new FormControl(''),
  Wensday: new FormControl(''),
  Thursday: new FormControl(''),

  Crn: new FormControl(''),
  TermCode: new FormControl(''),



});

//#region Definition input Form Edit LectureSchedule
this.EDitFormLectureSchedule = this.formBuilder.group({

  FacultyMemberIds:  ['',Validators.required],
  LectureTypeCodes:['',Validators.required],
  StartTimes:['',Validators.required],
  EndTimes: ['',Validators.required],
  RoomCodes: ['',Validators.required],
  ScheduleTypeCodes: ['',Validators.required],
  Saturdays:[''],
  Sundays: [''],
  Mondays:[''],
  Tuesdays: [''],
  Wensdays: [''],
  Thursdays: [''],

  Crns: new FormControl(this.srchForm.get('crnSection').value),
  TermCodes: new FormControl(this.srchForm.get('term').value,),


  });


}

get searchErrors() { return this.srchForm.controls; }
get FacultyErrors() { return this.FormFacultyMember.controls; }
get LectureScheduleErrors() { return this.LectureSchedule.controls; }
get EditLectureScheduleErrors() { return this.EDitFormLectureSchedule.controls; }




initializeFormGroup() {
  this.LectureSchedule.setValue({
    FacultyMemberId: '',
    LectureTypeCode: '',
    StartTime: '',
    EndTime: '',
    RoomCode:'',
    ScheduleTypeCode: '',
    Saturday: false,
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wensday: false,
    Thursday: false,
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


  DeletefacultyMemberEnrollment(facultyMemberEnrollmentID){
    
    this.AlertDeleteService.openConfirmDialog()
    .afterClosed().subscribe(res =>{
      if(res){

    this.FacultyMemberEnrollmentService.Delete(facultyMemberEnrollmentID).subscribe(res=>
      {
        console.log(res)
      this.GetAllfacultyMember();
      });
    //this.notificationService.warn(this.DeleteSuccessfully);

  }
  
  })



    }


  submit(){
    this.submitsearchError = true;
  // FormFacultyMember inputs
this.FormFacultyMember = new FormGroup({

  FacultyMemberId: new FormControl(),

  Crn: new FormControl(this.srchForm.get('crnSection').value),
  TermCodes: new FormControl(this.srchForm.get('term').value),
CourseSubject: new FormControl(this.CourseSubject.nativeElement.innerHTML),
  CourseNumber: new FormControl(this.CourseNumber.nativeElement.innerHTML),


  });

 this.initializeFormGroup();

 this.submitted = false;
  // Get FacultyMember
  this.facultyFilter.CollegeCode=this.srchForm.get('college').value;
  this.facultyFilter.DepartmentCode=this.srchForm.get('department').value;


  this.FacultyMemberService.Filter(this.facultyFilter).subscribe(
  (coll) =>{
  (this.FacultyMembers = coll.List)
  console.log(this.FacultyMembers);

  }

  );
this.GetallLectureSchedule();
this.GetAllfacultyMember();
  }

  onChange(value){

    this.FormFacultyMember.get('FacultyMemberId').value == value;

  }

  submitFormFacultyMember(){
    this.submitted = true;
    
    if ( this.srchForm.invalid) {
      return;
    }else{

    if(!this.facultyMemberEnrollments.some((fac) => fac.FacultyMemberId == this.FormFacultyMember.get('FacultyMemberId').value)){
      this.FacultyMemberEnrollmentService.Insert(this.FormFacultyMember.value)
      .subscribe(
        res => {
         // this.notificationService.success(this.AddSuccessfully);

          
          //updata table FormFacultyMember
      this.facultyMemberEnrollmentfilter.Crn=this.srchForm.get('crnSection').value;
      this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
      .subscribe(resp => {
      this.facultyMemberEnrollments = resp.List;
      console.log('resp after enrolment: ', resp.List);
      });
        }
        );

    }else{
      this.notificationService.warn('already exists');
    }

  }
    }

  onClear(){


    this.resetFormLectureSchedule();
    this.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }


DeleteLectureSchedule(LectureScheduleID){
  this.AlertDeleteService.openConfirmDialog()
  .afterClosed().subscribe(res =>{
    if(res){
    this.myservice.Delete(LectureScheduleID).subscribe(res=>this.GetallLectureSchedule());
    //this.notificationService.warn(this.DeleteSuccessfully);
    }

});

}


GetallLectureSchedule(){
  this.filter.TermCode =this.srchForm.get('term').value;
  this.filter.Crn = this.srchForm.get('crnSection').value;
  
  this.myservice.Filter(this.filter)
  .subscribe(resp => {
  this.elements = resp.List;
  // this.sessionService.Set(resp.List[0]);
  console.log(" before call ", resp)
  });
}


GetAllfacultyMember(){

  this.facultyMemberEnrollmentfilter.Crn=this.srchForm.get('crnSection').value;


  this.FacultyMemberEnrollmentService.Filter(this.facultyMemberEnrollmentfilter)
  .subscribe(resp => {
  this.facultyMemberEnrollments = resp.List;
  console.log(" before call ", resp)

    //this.FormFacultyMember.reset(this.FormFacultyMember.value);
  });
}

submitLectureSchedule(){
  this.submitscheduleError=true;

  if (this.LectureSchedule.invalid) {
    return;
  }else{

    this.myservice.Insert(this.LectureSchedule.value).subscribe(res=>{

      console.log("Insert-LectureSchedule",res),
      this.GetallLectureSchedule();
    });
  //this.notificationService.success(this.AddSuccessfully);

  this.onClear();
  this.closeModal.nativeElement.click();


  }

}

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
this.GetallLectureSchedule();
    }

    );
    //this.notificationService.success(this.updateSuccessfully);

    this.filter.TermCode =this.srchForm.get('term').value;
this.filter.Crn = this.srchForm.get('crnSection').value;


    this.myservice.Filter(this.filter)
    .subscribe(resp => {
    this.elements = resp.List;
    // this.sessionService.Set(resp.List[0]);
    console.log(" before call ", resp)
    });
  }
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();


  }
  refresh(): void {
    this.Router.navigateByUrl("admin/LectureSchedule", { skipLocationChange: true }).then(() => {
      this.Router.navigate([decodeURI(this.location.path())]);
    })
  }


  }

