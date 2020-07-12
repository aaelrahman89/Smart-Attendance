import { Component, OnInit, Input } from '@angular/core';
import { ExportExcelService } from './../../services/export-excel.service';

@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

   // Export to Excel Start
  //  fileName= 'Smart Attendance.xlsx';

  //  exportexcel(): void
  //  {
  //     /* table id is passed over here */
  //     let element = document.querySelector('.excel-print');
  //     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);


  //     /* generate workbook and add the worksheet */
  //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //     /* save to file */
  //     XLSX.writeFile(wb, this.fileName);
  //    }
     // Export to Excel End


     // Print
     printPage() {
      print();
      }

      @Input() elements: any = [];
      export(){
        this.ExportExcelService.exportAsExcelFile(this.elements, 'myExcelFile');
      }


  constructor(private ExportExcelService: ExportExcelService) { }

  ngOnInit(): void {
  }

}
