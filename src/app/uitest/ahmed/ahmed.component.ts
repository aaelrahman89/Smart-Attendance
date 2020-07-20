
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';

@Component({
  selector: 'ahmed-app',
  templateUrl: './ahmed.component.html',
  styleUrls: ['./ahmed.component.css']
})
export class AhmedComponent implements OnDestroy, OnInit {



    // Export to Excel Start
    fileName= 'Smart Attendance.xlsx';
    exportexcel(): void
    {
       /* table id is passed over here */
       let element = document.querySelector('.excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
      }
      // Export to Excel End



 // Initialized Table
//  @ViewChild(DataTableDirective, {static: false})

 @Input() headElements: any[];

 // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 // We use this trigger because fetching the list can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<any> = new Subject();


 // Rerender Table
 rerender(){
  // Destroy the table first
  this.dtTrigger.unsubscribe();
  // Call the dtTrigger to rerender again
  this.dtTrigger.next();
}


 @Input() ajaxFunc;





 constructor(public  translate: TranslateService ) {}


 ngOnInit(): void {

  this.dtOptions = DatatableOptions;
  this.dtOptions.ajax = this.ajaxFunc;



}

// Translate Table (Ar & En)
translateTable =  this.translate.onLangChange
.subscribe((event: LangChangeEvent) => {
 if(event.lang == 'ar'){
  this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
  this.rerender();
 }if (event.lang == 'en'){
  this.dtOptions.language.url = `/assets/i18n/English.json`;
  this.rerender();
 }
});


ngAfterViewInit(): void {
  console.log('after init');
  this.dtTrigger.next();
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

submitSearch(){
  this.rerender();
}

name: string;

onChangeFile(e){
   console.log(e.target.files[0]);
   this.name = e.target.files[0].name;
}


}
