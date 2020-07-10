import { Router } from '@angular/router';
import { TermService } from './../../services/admin/Term/term.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TermDTO } from 'src/app/models/admin/Term/TermDTO';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NotificationService } from 'src/app/services/genericService/notification.service';
import { errorHandling } from 'src/app/globals';

@Component({
  selector: 'term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css'],
})
export class TermComponent implements OnInit{
  @ViewChild('closeModal') closeModal;
  submitted = false;
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};

  dtTrigger: Subject<TermDTO> = new Subject();

  elements: TermDTO[];
  updateSuccessfully:string;

  editForm: FormGroup;

  pageLang = document.documentElement.lang;

  constructor(private myService: TermService, private titleService: Title,
     public  translate: TranslateService,
  private formBuilder: FormBuilder,
  private notificationService: NotificationService,
  public Router: Router

     ) {



  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',

      //  destroy: true,
      // Configure the buttons
      retrieve: true,
      // Configure the buttons
      language: {
        url: `/assets/i18n/Arabic.json`
      },


      buttons: [
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i>',
          titleAttr: 'print',
        },
        {
          extend: 'copyHtml5',
          text: '<i class="far fa-copy"></i>',
          titleAttr: 'Copy',
        },
        {
          extend: 'excelHtml5',
          text: '<i class="far fa-file-excel"></i>',
          titleAttr: 'Excel',
        },
      ],
    };

    // Get Data
    this.myService.GetAll().subscribe((res) => {
      this.elements = res.List;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    },
    err => errorHandling(err, this.Router.navigate(['login']))
    );

            // Translate Table (Ar & En)
            this.translate.onLangChange
            .subscribe((event: LangChangeEvent) => {
             if(event.lang == 'ar'){
              this.pageLang = event.lang;
              this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
              this.titleService.setTitle("الفصول الدراسية");
              this.updateSuccessfully="تم التحديث بنجاح";
              // ahmed 1
              console.log('ar done');
             }if (event.lang == 'en'){
              this.pageLang = event.lang;
              this.dtOptions.language.url = `/assets/i18n/English.json`;
              this.titleService.setTitle("Semester");
              this.updateSuccessfully="The Spdate was Successful";
              // ahmed 2
              console.log('en done');
             }
            });



    this.editForm = this.formBuilder.group({
      nameAR:  ['',Validators.required],
      nameEN:  ['',Validators.required],
      startDate:  ['',Validators.required],
      endDate:  ['',Validators.required],
    });


  }

  // // date validation
  // dateValidation(startDate: FormControl  ){
  //   var start = new Date(startDate.value);
  //   var end = new Date ;
  //   if (  end > start ) console.log("");
  //  return {wrongDuration : true}
  // }
  get editFormErrors() { return this.editForm.controls; }
  // update active
  changeActive(element) {
    element.IsCurrent = !element.IsCurrent;
    this.myService.Update(element).subscribe(() => console.log('data updated'));
  }

  showMod(termId){
    this.myService.GetById(termId).subscribe(res => {
      this.editForm.patchValue({
        nameAR: res.NameAr,
        nameEN: res.NameEn,
        startDate: res.StartDate,
        endDate: res.EndDate
      });
    });
  }


  edit(element){

    this.submitted = true;
    if ( this.editForm.invalid) {
      return;
    }else{

    element.NameAr = this.editForm.get('nameAR').value;
    element.NameEn = this.editForm.get('nameEN').value;
    element.StartDate = this.editForm.get('startDate').value;
    element.EndDate = this.editForm.get('endDate').value;
    this.myService.Update(element).subscribe(res =>
      {
      console.log('updated');
      }


      );
      this.closeModal.nativeElement.click();
      // this.notificationService.success(this.updateSuccessfully);
    }
  }


}
