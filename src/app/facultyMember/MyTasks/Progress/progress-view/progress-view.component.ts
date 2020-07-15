import { GetMyTasksservice } from './../../../../services/FacultyMember/RequestTask/GetMyTasks.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import {  FormGroup, FormControl, Validators, FormGroupDirective ,FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { GetMyTasksDTO } from 'src/app/models/FacultyMemberModal/RequestTask/GetMyTasksDTO';
@Component({
  selector: 'progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.css']
})
export class ProgressViewComponent implements OnInit {
  TaskDetails:any={};
  pageLang = document.documentElement.lang;
  dtOptions: any = {};
  show:boolean=false;
  isChecked:boolean=true;
  decisionForm:FormGroup;
  MyDetails:any;
  submitTasksProgresError=false;
  Message:string;

  // IsCompleted2 = document.getElementById('IsCompleted2');

 // confirmation modal
 @ViewChild('mainForm') mainForm: FormGroupDirective;
 @ViewChild('DetailscModalsss') DetailscModalsss;
 openModal: boolean = false;
 CustomModal(){
   this.openModal = !this.openModal
 }
  constructor(
    public  translate: TranslateService,
    private titleService: Title,
    private Router: Router,
    private Route: ActivatedRoute,
    private GetMyTasksservice:GetMyTasksservice,
    private _location: Location,
private formBuilder: FormBuilder,


  ) { }
  Id = this.Route.snapshot.paramMap.get('Id');

  subscription: Subscription;
 subscriptionb: Subscription;
  ngOnInit(): void {


               // Translate Table (Ar & En)
               this.subscription = this.translate.onLangChange
               .subscribe((event: LangChangeEvent) => {
                if(event.lang == 'ar'){
                 this.pageLang = event.lang;
                 this.titleService.setTitle(" مهام تحت الاجراء");
                 this.GetMyTasks();

                 this.MedicalExcuseDetails();
                 // this.getAllData();
                }if (event.lang == 'en'){
                 this.pageLang = event.lang;
                 this.titleService.setTitle("Tasks Under Procedure");
                 this.GetMyTasks();
                 this.MedicalExcuseDetails();
                 // this.getAllData();
                }
               });

               this.GetMyTasks();
               this.MedicalExcuseDetails();


                  // search form inputs
this.decisionForm = new FormGroup({
      Decision: new FormControl('', Validators.required),
      Notes: new FormControl('', Validators.required),
      TaskId: new FormControl(this.Id, Validators.required)
    });


    // Remove required when Decision === 'Approved'
    this.decisionForm.get('Decision').valueChanges
    .subscribe(value => {
      console.log(value);
      if (value === 'Approved'){
        this.decisionForm.get('Notes').clearValidators();
        this.decisionForm.get('Notes').updateValueAndValidity();
      }else{
        this.decisionForm.get('Notes').setValidators([Validators.required]);
        this.decisionForm.get('Notes').updateValueAndValidity();
      }
    });


  }


  GetMyTasks(){

    this.GetMyTasksservice.GetTaskDetailsByID(this.Id).subscribe(res => {

      const IsCompleted2 = <HTMLInputElement> document.getElementById("IsCompleted2");

      if(res.TaskStatus === 'Rejected'){
        IsCompleted2.checked = true;
        this.show = true;
      }

      console.log('checked =', IsCompleted2.checked);

      this.decisionForm.patchValue({
        Decision:res.TaskStatus,
        Notes:res.Note,


      })
      this.TaskDetails = res;

      console.log(res);
    });
  }

  MedicalExcuseDetails(){
    this.GetMyTasksservice.MedicalExcuseDetails(this.Id).subscribe(res => {
      this.MyDetails = res;
    
      console.log(res);
    },
    err=>this.Message=err.error.Message
    
    );

  }
//   onChangeRejected(event){
//     if(this.decisionForm.get('Decision').value === 'Rejected'){
//       this.decisionForm.get('Notes').setValidators([Validators.required]);
//   }  //this.show=true;
//  }


get TasksProgresformErrors() { return this.decisionForm.controls; }
submit(){

  this.submitTasksProgresError=true;

  if (this.decisionForm.invalid) {
    return;
  }else{
    this.GetMyTasksservice.PostTask(this.decisionForm.value).subscribe(res => {
      this.openModal = !this.openModal;
      this._location.back();
      console.log("msg",res);
    });

  }
  }




  True(){

    this.show = true;
  }


  close(){
    this._location.back();
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
  }
}
