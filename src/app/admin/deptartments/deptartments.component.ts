import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';
import { DeptartmentDTO } from '../../models/Department/DeptartmentDTO';
import { DeptartmentService } from './../../services/deptartment.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { errorHandling } from 'src/app/globals';
import { Router } from '@angular/router';
import { DatatableOptionsClient } from 'src/app/models/commonModels/DatatableOptionsClient';

@Component({
  selector: 'app-deptartments',
  templateUrl: './deptartments.component.html',
  styleUrls: ['./deptartments.component.css']
})
export class DeptartmentsComponent implements OnDestroy, OnInit {

  pageTitle = 'Deptartment Administration';

  editForm: FormGroup;

  // confirmation modal
  @ViewChild('mainForm') mainForm: FormGroupDirective;
  @ViewChild('basicModal') basicModal;
  openModal: boolean = false;
  CustomModal(){
    this.openModal = !this.openModal
  }

  headElements: string[] = ['Department Code', 'College', 'Department Name(AR)', 'Department Name(EN)', 'Status'];

// Must be declared as "any", not as "DataTables.Settings"
dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<DeptartmentDTO> = new Subject();

  filter:DepartmentFilterModel = new DepartmentFilterModel();

  elements: DeptartmentDTO[];

  pageLang = document.documentElement.lang;

  constructor(private myService: DeptartmentService, public  translate: TranslateService, public Router: Router) { }

  ngOnInit(): void {

    this.dtOptions = DatatableOptionsClient;


        // Get Data
    this.myService.GetAll().subscribe(res =>
          {
          this.elements = res.List;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          },
          err => errorHandling(err, this.Router.navigate(['login']))
        );

        this.editForm = new FormGroup({
          nameAR: new FormControl('', Validators.required),
          nameEN: new FormControl('', Validators.required)
        });


                // Translate Table (Ar & En)
                this.translate.onLangChange
                .subscribe((event: LangChangeEvent) => {
                 if(event.lang == 'ar'){
                  this.pageLang = event.lang;
                  this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
                  // ahmed 1
                  console.log('ar done');
                 }if (event.lang == 'en'){
                  this.pageLang = event.lang;
                  this.dtOptions.language.url = `/assets/i18n/English.json`;
                  // ahmed 2
                  console.log('en done');
                 }
                });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

    // update active
    changeActive(element){
      element.IsActive = !element.IsActive;
      this.myService.Update(element).subscribe(() => console.log('data updated'));
    }

    showMod(depId){
      this.myService.GetById(depId).subscribe(res => {
        this.editForm.patchValue({
          nameAR: res.NameAr,
          nameEN: res.NameEn
        });
      });
    }

    submit(element){
      element.NameAr = this.editForm.get('nameAR').value;
      element.NameEn = this.editForm.get('nameEN').value;
      this.myService.Update(element).subscribe(res =>
        {
        console.log('updated');
        this.openModal = !this.openModal;
        this.basicModal.hide();
        }
        );
    }

}
