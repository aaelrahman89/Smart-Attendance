import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.css']
})
export class CourseReportComponent implements OnInit {

  srchForm:FormGroup;
  constructor(
    public  translate: TranslateService,
    private titleService: Title,

  ) { }
  subscription: Subscription;
  subscriptionb: Subscription;
  ngOnInit(): void {

       // Translate Table (Ar & En)
       this.subscription = this.translate.onLangChange
       .subscribe((event: LangChangeEvent) => {
        if(event.lang == 'ar'){
          this.titleService.setTitle("تقرير الكورسات ");
   
      
        }if (event.lang == 'en'){
          this.titleService.setTitle("Course Report ");
   
    
        }
       });

       // search form inputs
 this.srchForm = new FormGroup({
  CRN: new FormControl(''),
  CourseNumber: new FormControl(''),
  CourseSubject: new FormControl('')
});
  }


  submit(){

  }

}
