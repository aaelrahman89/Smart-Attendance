import { Router } from '@angular/router';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';
import { DepartmentFilterModel } from './../../models/Department/DepartmentFilterModel';
import { DeptartmentService } from './../../services/deptartment.service';
import { CollegeService } from './../../services/college.service';
import { MajorService } from './../../services/major.service';
import { MajorFilterModel } from './../../models/Major/MajorFilterModel';
import { MajorDTO } from './../../models/Major/MajorDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { errorHandling } from 'src/app/globals';

@Component({
  selector: 'majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css'],
})
export class MajorsComponent implements OnInit {

  // Initialized Table
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  // isDtInitialized:boolean = false;

  editForm: FormGroup;

    // confirmation modal
    @ViewChild('mainForm') mainForm: FormGroupDirective;
    @ViewChild('basicModal') basicModal;
    openModal: boolean = false;
    CustomModal(){
      this.openModal = !this.openModal
    }

  pageLang = document.documentElement.lang;

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

  // dtTrigger
  dtOptions: any = {};
  dtTrigger: Subject<MajorDTO> = new Subject();

  filter: MajorFilterModel = new MajorFilterModel();

  departmentFilter: DepartmentFilterModel = new DepartmentFilterModel();

  elements: MajorDTO[];

  elementsFiltered: MajorDTO[];

  colleges: any = [];
  departments: any = [];

  srchForm: FormGroup;

  // showTable: boolean = false;

  constructor( private myService: MajorService, private CollegeService: CollegeService, private DeptartmentService: DeptartmentService, public  translate: TranslateService, public Router: Router ) {}

  ngOnInit(): void {

    this.dtOptions = DatatableOptions;

    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
      this.filter.pageIndex = page;
      this.filter.pagelength = dataTablesParameters.length;

      this.filter.CollegeCode = this.srchForm.get('college').value;
      this.filter.DepartmentCode = this.srchForm.get('department').value;

      this.myService.Filter(this.filter)
        .subscribe(resp => {
          this.elements = resp.List;
          // this.sessionService.Set(resp.List[0]);
          console.log(" before call ", resp)
          callback({
            data: [],
            recordsTotal: resp.ResultPaging.RecordsTotal,
            recordsFiltered: resp.ResultPaging.RecordsFiltered
          });
        },
        err => errorHandling(err, this.Router.navigate(['login']))
        );
    };


    // Translate Table (Ar & En)
    this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
     if(event.lang == 'ar'){
      this.pageLang = event.lang;
      this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
      this.rerender();
     }if (event.lang == 'en'){
      this.pageLang = event.lang;
      this.dtOptions.language.url = `/assets/i18n/English.json`;
      this.rerender();
     }
    });

    // Get Colleges
    this.CollegeService.GetAll().subscribe(
      (coll) => (this.colleges = coll.List),
      err => errorHandling(err, this.Router.navigate(['login']))
    );

    // search form inputs
    this.srchForm = new FormGroup({
      college: new FormControl('', Validators.required),
      department: new FormControl(''),
    });

    // edit form inputs
    this.editForm = new FormGroup({
      nameAR: new FormControl('', Validators.required),
      nameEN: new FormControl('', Validators.required)
    });

  }

  ngAfterViewInit(): void {
    console.log('after init');
    this.dtTrigger.next();
  }


  // update active
  changeActive(element) {
    element.IsActive = !element.IsActive;
    this.myService.Update(element).subscribe(() => console.log('data updated'));
  }

  // onChangeCollege
  onChangeCollege(collegeCode) {
    this.departmentFilter.CollegeCode = collegeCode;
    this.DeptartmentService.Filter(this.departmentFilter).subscribe(dep => this.departments = dep.List);
  }


  showMod(majorId){
    this.myService.GetById(majorId).subscribe(res => {
      console.log('res: ', res);
      this.editForm.patchValue({
        nameAR: res.NameAr,
        nameEN: res.NameEn
      });
    });
  }

  // submit search form
  submit() {
    this.rerender();

  }




  // Edit
  edit(element){
    console.log('ele', element);
    element.NameAr = this.editForm.get('nameAR').value;
    element.NameEn = this.editForm.get('nameEN').value;
    this.myService.Update(element).subscribe(res =>
      {

        this.rerender();
        this.openModal = !this.openModal;
        this.basicModal.hide();

      }
      );
  }





}
