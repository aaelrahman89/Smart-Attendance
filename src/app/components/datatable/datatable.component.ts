import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { DeptartmentService } from 'src/app/services/deptartment.service';
import { DataTableDirective } from 'angular-datatables';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnDestroy, OnInit {

  @Input() headElements: string[];
  @Input() elements: any[];

  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

    // Initialized Table
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    isDtInitialized:boolean = false;


    // Table Init Function
    tableInit(){
    // Calling the DT trigger to manually render the table
    if (this.isDtInitialized) {
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
         dtInstance.destroy();
     });
    } else {
     this.isDtInitialized = true;
     this.dtTrigger.next();
   }
   }


  constructor(private myService: DeptartmentService,
    public  translate: TranslateService,
    ) { }



  ngOnInit(): void {



    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
    if(event.lang == 'ar'){
  
    this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
    }if (event.lang == 'en'){
   
    this.dtOptions.language.url = `/assets/i18n/English.json`;
    
    }
    });

    // Table Options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'pageLength',
        {
          extend:    'print',
          text:      '<i class="fas fa-print"></i>',
          titleAttr: 'print'
      },
        {
          extend:    'copyHtml5',
          text:      '<i class="far fa-copy"></i>',
          titleAttr: 'Copy'
        },
        {
          extend:    'excelHtml5',
          text:      '<i class="far fa-file-excel"></i>',
          titleAttr: 'Excel'
      }
      ]
    };

       // Get Data
       this.myService.GetAll().subscribe(res =>
        {
        this.elements = res.List;
        this.tableInit();
        }
      );

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
