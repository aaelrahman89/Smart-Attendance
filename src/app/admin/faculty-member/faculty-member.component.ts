import { Component, OnInit, OnDestroy, ViewChild, Pipe } from '@angular/core';
import { FacultyMemberService } from 'src/app/services/admin/facultyMember/faculty-member.service';
import { Subject, forkJoin } from 'rxjs';
import { languageForDataTable } from '../../models/CommonModels/LanguageForDataTable';
import { Router } from '@angular/router';
import { MajorFilterModel } from 'src/app/models/Major/MajorFilterModel';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { facultyFilterModel } from 'src/app/models/facultymember/faculty-filter-model.service';
import { DataTableDirective } from 'angular-datatables';
import { DeptartmentService } from './../../services/deptartment.service';
import { NationalitiesService } from 'src/app/services/admin/Nationalities/nationalities.service';
import { DeptartmentDTO } from 'src/app/models/Department/DeptartmentDTO';
import { CollegeService } from 'src/app/services/college.service';
import { CollegeDTO } from 'src/app/models/CollegeDTO';
import { facultyMemberDTO } from 'src/app/models/facultymember/faculty-member-dto';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'faculty-member',
  templateUrl: './faculty-member.component.html',
  styleUrls: ['./faculty-member.component.css']

})
export class FacultyMemberComponent implements OnInit, OnDestroy {

  // Rerender Table
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<facultyMemberDTO> = new Subject();
  dtdepartments: Subject<DeptartmentDTO> = new Subject();
  CollegeDTO: CollegeDTO[];
  elements: facultyMemberDTO[];
  filter: facultyFilterModel = new facultyFilterModel();
  pageLang = document.documentElement.lang;
  loading = true;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  editForm: FormGroup;
  popupElements;
  stop;
  departments;
  nationalties;

  constructor(private myService: FacultyMemberService, private DeptartmentService: DeptartmentService,
    private NationalitiesService: NationalitiesService, private CollegeService: CollegeService,
    public translate: TranslateService) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false,
      language: {
        url: `/assets/i18n/Arabic.json`
      },
      lengthMenu: [5, 10, 15, 25, 50, 100],
      pageLength: 10,
      ordering: true,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
        this.filter.pageIndex = page;
        this.filter.pagelength = dataTablesParameters.length;
        this.loading = false;

        // Translate Table (Ar & En)
        this.translate.onLangChange
          .subscribe((event: LangChangeEvent) => {
            if (event.lang == 'ar') {
              this.pageLang = event.lang;
              this.dtOptions.language.url = `/assets/i18n/Arabic.json`;
              // ahmed 1
              console.log('ar done');
            } if (event.lang == 'en') {
              this.pageLang = event.lang;
              this.dtOptions.language.url = `/assets/i18n/English.json`;
              // ahmed 2
              console.log('en done');
            }
          });


        // Custom Filters Here 
        this.myService.Filter(this.filter)
          .subscribe(resp => {
            this.elements = resp.List;
            // this.sessionService.Set(resp.List[0]);
            callback({
              data: [],
              recordsTotal: resp.ResultPaging.RecordsTotal,
              recordsFiltered: resp.ResultPaging.RecordsFiltered
            });
          });
      }

    };

    this.editForm = new FormGroup({
      nameAr: new FormControl(null, [Validators.required, this.arVal]),
      nameEn: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      collegeCode: new FormControl(),
      Departmentcode: new FormControl(),
      NationalityCode: new FormControl(),
      uniEmail: new FormControl(null, [Validators.required, Validators.email]),
      altEmail: new FormControl(null, [Validators.required, Validators.email]),
      idNum: new FormControl(null, [Validators.required, Validators.min(10)]),
      TelephoneNumber: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      degree: new FormControl(null, Validators.required),

    })

  }
  
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // update active
  changeActive(element) {
    element.IsActive = !element.IsActive;
    this.myService.Update(element).subscribe(() => console.log('data updated'));
  }
  table;
  memberIdForFilter;
  memberName;
  showTimeTable(memberId, NAME) {
    this.table = true;
    this.memberName = NAME;
    console.log(this.memberName)
    this.memberIdForFilter = memberId;

  }
  // selectedDep;
  selectedDepartment;
  selectednatio;
  selectedCollege;
  showUp(memberID, selecteddepCode, selectednatioCode, selectedcollCode) {
    this.popupElements = memberID;
    this.stop = true;
    // member info api
    forkJoin([
      this.CollegeService.GetAll(),
      this.DeptartmentService.GetAll(),
      this.NationalitiesService.GetAll(),
      this.myService.GetById(memberID)
    ]).subscribe(
      data => {
        this.CollegeDTO = data[0].List;
        this.departments = data[1].List;
        this.nationalties = data[2].List;
        this.popupElements = data[3];
        this.selectedDepartment = selecteddepCode;
        this.selectedCollege = selectedcollCode;
        this.selectednatio = selectednatioCode;
        this.editForm.patchValue({
          nameAr: this.popupElements.NameAr,
          nameEn: this.popupElements.NameEn,
          birthDate: this.popupElements.DateOfBirth,
          // allColleges: this.CollegeDTO,
          collegeCode: this.popupElements.CollegeCode,
          // Department: this.departments,
          Departmentcode: this.popupElements.DepartmentCode,
          // Nationality: this.nationalties,
          NationalityCode: this.popupElements.NationalityCode,
          TelephoneNumber: this.popupElements.TelephoneNumber,
          uniEmail: this.popupElements.UniversityEmail,
          altEmail: this.popupElements.AlternativeEmail,
          idNum: this.popupElements.NationalId,
          gender: this.popupElements.Gender,
          degree: this.popupElements.ScientificDegree
        });


      }
    )
  }

  onClosed(event: any) {
    this.table = false;
    this.stop = false;
    this.popupElements = '';
    this.selectedDepartment = '';
    this.selectedCollege = '';
    this.selectednatio = '';
  }

  submit(object) {
    console.log(this.editForm )
    object.nameAr = this.editForm.get('nameAr').value;
    object.nameEn = this.editForm.get('nameEn').value;
    object.birthDate = this.editForm.get('birthDate').value;
    object.uniEmail = this.editForm.get('uniEmail').value;
    object.altEmail = this.editForm.get('altEmail').value;
    object.idNum = this.editForm.get('idNum').value;
    object.gender = this.editForm.get('gender').value;
    object.degree = this.editForm.get('degree').value;
    object.NationalityCode = this.editForm.get('NationalityCode').value;
    object.Departmentcode = this.editForm.get('Departmentcode').value;
    object.CollegeCode = this.editForm.get('collegeCode').value;
    this.myService.Update(object).subscribe(res => {
      this.rerender();
    })
  }

  // arabic language validation
  arVal(control: FormControl){
    var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
    if (  isArabic.test(control.value)) return null;
    return {notArabic : true} 
  }


}
