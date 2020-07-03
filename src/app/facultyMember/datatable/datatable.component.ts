import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FilterModel } from './../../models/commonModels/FilterModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnDestroy, OnInit {

   @Input() headElements: string[];

  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
    // We use this trigger because fetching the list can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject();


    @Input() elements = [];

  constructor() { }

  filter: FilterModel= new FilterModel();

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
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
        // this.myService.GetAll2(this.filter).subscribe(res =>
        //   {
        //    this.elements = res.list
        //    // Calling the DT trigger to manually render the table
        //    this.dtTrigger.next();
        //   }
        //  )

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
