import { GetMyTasksservice } from './../../../../services/FacultyMember/RequestTask/GetMyTasks.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
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



  // IsCompleted2 = document.getElementById('IsCompleted2');


  constructor(
    public  translate: TranslateService,
    private titleService: Title,
    private Router: Router,
    private Route: ActivatedRoute,
    private GetMyTasksservice:GetMyTasksservice,
    private _location: Location

  ) { }
  Id = this.Route.snapshot.paramMap.get('Id');
  ngOnInit(): void {

    // if(this.IsCompleted2.checked == true){
    //    alert('ah')
    // }


    // if(this.TaskDetails.TaskStatus == 'Rejected'){

    // }

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
               // Translate Table (Ar & En)
               this.translate.onLangChange
               .subscribe((event: LangChangeEvent) => {
                if(event.lang == 'ar'){
                 this.pageLang = event.lang;
                 this.titleService.setTitle(" مهام تحت الاجراء");


                 // this.getAllData();
                }if (event.lang == 'en'){
                 this.pageLang = event.lang;
                 this.titleService.setTitle("Tasks Under Procedure");

                 // this.getAllData();
                }
               });


                  // search form inputs
    this.decisionForm = new FormGroup({
      Decision: new FormControl(''),
      Notes: new FormControl(''),
      TaskId:new FormControl(this.Id),

    });



  }
  onChangeRejected(event){
if(event.target.checked){
  this.show=true;
}
    //this.show=true;
 }
 onChangeApproved(event){

  if(event.target.checked){
    this.show=false;
  }
}

submit(){

    this.GetMyTasksservice.PostTask(this.decisionForm.value).subscribe(res => {
      this._location.back();
      console.log();
    });


  }




  True(){

    this.show = true;
  }


  close(){
    this._location.back();
  }
}
