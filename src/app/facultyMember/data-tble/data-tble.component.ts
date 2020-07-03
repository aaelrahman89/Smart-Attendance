import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { languageForDataTable } from '../../models/CommonModels/LanguageForDataTable';
import { Subject } from 'rxjs';
import { IResultForDatatTableDTO } from '../../models/CommonModels/IResultForDatatTableDTO';
import { CollegeDTO } from 'src/app/models/CollegeDTO';
import { CollegeService } from 'src/app/services/college.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';

@Component({
  selector: 'app-data-tble',
  templateUrl: './data-tble.component.html',
  styleUrls: ['./data-tble.component.css']
})
export class DataTbleComponent implements OnInit {

  @ViewChild(DataTablesModule, { static: false }) dtElement: DataTablesModule;
  @ViewChild('dialog', { static: false }) dialogView: TemplateRef<any>;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<CollegeDTO> = new Subject();
  // dialog: NbDialogRef<any>;
  filter: FilterModel= new FilterModel();

  constructor( private myService: CollegeService ) { }

  ngOnInit(): void {

    this.bindDtOptions();
  }

  bindDtOptions(): void {
    const self = this;
    this.dtOptions = {
      lengthMenu: [5, 10, 15, 25],
      pageLength: 10,
      ordering: true,
      serverSide: true,
      processing: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
        this.filter.pageIndex = page;
        this.filter.pagelength = dataTablesParameters.length;
        this.myService.GetAll2(this.filter)
          .subscribe(resp => {

            // this.sessionService.Set(resp.List[0]);
            console.log(" before call ", resp)
            callback({
              data: resp.List,
              recordsTotal: resp.ResultPaging.RecordsTotal,
              recordsFiltered: resp.ResultPaging.RecordsFiltered
            });
          });
      },

      columns: [
        {//0
          data: 'id',
          title: "الرقم"
        },
        {//1
          data: 'nameAr',
          title: "الاسم"
        },
        {//2
          title: 'status'
        }
      ],

      columnDefs:
        [
          {
            'targets': 2,
            'searchable': false,
            'orderable': false,
            'render': function (data) {
              // tslint:disable-next-line:max-line-length
              return ` <input type='button' class='edit btn btn-primary' value='test'/> `
            }
          },
         ],
      language: languageForDataTable
      ,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td .edit', row).unbind('click');
        $('td .edit', row).bind('click', () => {


          });

        return row;
      }
    };
  }

  ngAfterViewInit(): void {
    console.log('after init');
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
