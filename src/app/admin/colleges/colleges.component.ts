import { Router } from '@angular/router';

import { CollegeDTO } from './../../models/CollegeDTO';
import { CollegeService } from './../../services/college.service';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ModalDirective } from 'angular-bootstrap-md';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { errorHandling } from 'src/app/globals';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';

import { MyModalComponent } from 'src/app/my-modal.component';


@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})

export class CollegesComponent implements OnDestroy, OnInit {

  @ViewChild('basicModal') basicModal: ModalDirective;


  // headElements: string[] = ['College Code', 'College Name(AR)', 'College Name(EN)', 'Status'];

  // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  isDtInitialized:boolean = false;

// Must be declared as "any", not as "DataTables.Settings"
dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<CollegeDTO> = new Subject();

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

  elements: CollegeDTO[];

  editForm: FormGroup;

  subscription: Subscription;
  subscriptionb: Subscription;

  constructor( private myService: CollegeService, public  translate: TranslateService, public Router: Router ) { }
  ngOnInit(): void {

    this.dtOptions = DatatableOptionsClient;

        // Translate Table (Ar & En)
        this.subscription = this.translate.onLangChange
        .subscribe((event: LangChangeEvent) => {
         if(event.lang == 'ar'){
          this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
          this.getAllData();
         }if (event.lang == 'en'){
          this.dtOptions.language.url = `/assets/i18n/English.json`;
          this.getAllData();
         }
        });


        // Get Data
        this.getAllData();




        this.editForm = new FormGroup({
          Name: new FormControl('', Validators.required),
        });

  }


  // get all data function
  getAllData(){
    this.subscriptionb = this.myService.GetAll().subscribe(res =>
      {
      this.elements = res.List;
      // Calling the DT trigger to manually render the table
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
        });
    } else {
        this.isDtInitialized = true;
        this.dtTrigger.next();
    }
      },
      err => errorHandling(err, this.Router.navigate(['login']))
    );
  }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.subscription.unsubscribe();
    this.subscriptionb.unsubscribe();
  }



    // update active
    changeActive(element){
      element.IsActive = !element.IsActive;
      this.myService.Update(element).subscribe(() => console.log('data updated'));
    }

    showMod(collId){
      this.myService.GetById(collId).subscribe(res => {
        this.editForm.patchValue({
          Name: res.Name,
        });
      });
    }

    edit(element){
      element.Name = this.editForm.get('Name').value;
      this.myService.Update(element).subscribe(res =>
        {
        console.log('updated');
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
          });
      } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
      }
        }
        );
    }


    }
