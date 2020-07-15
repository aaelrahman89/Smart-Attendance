import { GetMyTasksDTO } from './../../../../models/FacultyMemberModal/RequestTask/GetMyTasksDTO';
import { GetMyTasksservice } from './../../../../services/FacultyMember/RequestTask/GetMyTasks.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GetMyTasksFilterModel } from 'src/app/models/FacultyMemberModal/RequestTask/GetMyTasksFilterModel';

@Component({
  selector: 'progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.css']
})
export class ProgressListComponent implements OnInit {
  pageLang = document.documentElement.lang;
  dtOptions: any = {};
  MyTasks:GetMyTasksDTO;
  isCompeleted:boolean=true;
  constructor(
    public  translate: TranslateService,
    private titleService: Title,
    private GetMyTasksservice:GetMyTasksservice,
    private Router: Router,
  ) { }
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;

  filter: GetMyTasksFilterModel = new GetMyTasksFilterModel();
   dtTrigger: Subject<any> = new Subject();

   subscription: Subscription;
  // subscriptionb: Subscription;
  ngOnInit(): void {


                // Translate Table (Ar & En)
        this.subscription = this.translate.onLangChange
        .subscribe((event: LangChangeEvent) => {
         if(event.lang == 'ar'){
          this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
          this.titleService.setTitle(" تحت الاجراء ");
          this.getAllData();
         }if (event.lang == 'en'){
          this.dtOptions.language.url = `/assets/i18n/English.json`;
          this.titleService.setTitle("Under The Procedure");
          this.getAllData();
         }
        });



               this.dtOptions = DatatableOptionsClient;

               this.getAllData();

  }


  TasksProgresView(Id){
    this.Router.navigate(['/facultyMember/TasksProgresView', Id ])

  }


  AskedpermissionView(Id){
    this.Router.navigate(['/facultyMember/AskedpermissionView', Id ])
  }

  getAllData(){

    this.GetMyTasksservice.GetTaskAll(false).subscribe(res => {
      this.MyTasks = res;
     if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
      });
  } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
  }
  console.log(res);
    });


  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
 
  }


}
