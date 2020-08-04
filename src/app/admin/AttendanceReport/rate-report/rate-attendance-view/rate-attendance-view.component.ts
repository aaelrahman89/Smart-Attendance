import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Subscription, Subject } from 'rxjs';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';
import { GetAttendanceRateReportDTO } from 'src/app/models/admin/AttendanceReports/GetAttendanceRateReportsDTO';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'rate-attendance-view',
  templateUrl: './rate-attendance-view.component.html',
  styleUrls: ['./rate-attendance-view.component.css']
})
export class RateAttendanceViewComponent implements OnInit {
  srchForm:FormGroup;
  colleges: any = [];
  departments: any = [];

   // Initialized Table
   @ViewChild(DataTableDirective, {static: false})
   dtElement: DataTableDirective;
   isDtInitialized:boolean = false;
 
 // Must be declared as "any", not as "DataTables.Settings"


 dtTrigger: Subject<GetAttendanceRateReportDTO> = new Subject();

   // We use this trigger because fetching the list can be quite long,
   // thus we ensure the data is fetched before rendering
   dtOptions: any = {};


 
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
 
  constructor(

    public  translate: TranslateService,
    private titleService: Title,



  ) { }

  subscription: Subscription;
  subscriptionb: Subscription;

  ngOnInit(): void {
    this.dtOptions = DatatableOptionsClient;
    // Translate Table (Ar & En)
    this.subscription = this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
      this.titleService.setTitle("نسبة الغياب");
   
     }if (event.lang == 'en'){
      this.dtOptions.language.url = `/assets/i18n/English.json`;

      this.titleService.setTitle("Rate Report");
     }
    });




}




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
    this.subscriptionb.unsubscribe();
  }

}
