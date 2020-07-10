import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollegeDTO } from 'src/app/models/CollegeDTO';
import { CollegeService } from 'src/app/services/college.service';
import { GetAvailableCollegesForStudentStatusSettingDTO } from 'src/app/models/admin/StudentStatusSetting/GetAvailableCollegesForStudentStatusSettingDTO';
import { StudentStatusSettingService } from 'src/app/services/admin/StudentStatusSetting/StudentStatusSetting.service';
import { GetByCollegeCodeForStudentStatusSettingDTO, StudentStatusList, GetByCollegeCodeForStudentStatusSettingClass } from 'src/app/models/admin/StudentStatusSetting/GetByCollegeCodeForStudentStatusSettingDTO';
import { ModalService } from 'src/app/modal-service/modal-service.service';
import { MyModalComponent } from 'src/app/my-modal.component';

@Component({
  selector: 'student-status',
  templateUrl: './student-status.component.html',
  styleUrls: ['./student-status.component.css']
})
export class StudentStatusComponent implements OnInit, OnDestroy {

  colleges: CollegeDTO[];
  availableColleges: GetAvailableCollegesForStudentStatusSettingDTO[];
  StudentStatusList: GetByCollegeCodeForStudentStatusSettingDTO;
  collFilteredLast: any = [];
  StudentStatusListArray: any = [];
  studentStatusForm: FormGroup;
  studentStatusFormAdd: FormGroup;
  getByCollegeCodeInitSubscription: Subscription;
  myArr = [];

  myObj:StudentStatusList = new StudentStatusList();
  GetByCollegeCodeForStudentStatusSettingClass: GetByCollegeCodeForStudentStatusSettingClass = new GetByCollegeCodeForStudentStatusSettingClass();



  constructor(private CollegeService: CollegeService, private StudentStatusSettingService: StudentStatusSettingService, private _fb: FormBuilder, private modalService: ModalService) { }
  ngOnInit(): void {

    // Get Available Colleges
    this.StudentStatusSettingService.GetAvailableCollegesForStudentStatusSetting().subscribe(res => this.availableColleges = res);

    // Get By College Code on int for general settings
    this.getByCollegeCodeInit('');


    // init form
    // this.studentStatusForm = new FormGroup({
    //   CollegeCode: new FormControl(''),
    //   StudentStatusStatusId: new FormControl(''),
    //   StudentStatus: new FormControl('')
    // })

     // init add form
      this.studentStatusFormAdd = new FormGroup({
      CollageCode: new FormControl(''),
      StudentStatusList: new FormControl('')
    })





    // init form 2
    // this.studentStatusForm = this._fb.group({
    //   CollegeCode: [''],
    //   StudentStatus: this._fb.array([
    //     this.initStudentStatus(),
    //   ]),
    // });


  }

  // get StudentStatus(): FormArray {
  //   return this.studentStatusForm.get('StudentStatus') as FormArray;
  // }

//   initStudentStatus() {
//     return this._fb.group({
//       StatusId: [this.studentStatusForm.get('StudentStatus').value.StatusId],
//       StatusCode: [this.studentStatusForm.get('StudentStatus').value.StatusCode]
//     });
// }


  getCollegesInit() {
    this.CollegeService.GetAll().subscribe(res => {
      this.colleges = res.List;
      this.collFilteredLast = this.colleges.filter(item1 =>
        !this.availableColleges.some(item2 => (item2.CollegeCode === item1.CollegeCode)));
    });
  }


  onChange(StudentStatus){
    this.myArr = this.StudentStatusListArray;
    StudentStatus.IsActive = !StudentStatus.IsActive;
    if(!this.myArr.some(x => x.Id == StudentStatus.Id)){
      this.myArr.push(StudentStatus);
    }
    this.GetByCollegeCodeForStudentStatusSettingClass.StudentStatusList =  this.myArr;
   }



  getByCollegeCodeInit(collegeCode) {
    this.getByCollegeCodeInitSubscription = this.StudentStatusSettingService.GetByCollegeCode(collegeCode).subscribe(res => {
      console.log('ress', res);
      this.StudentStatusList = res;
      this.StudentStatusListArray = res.StudentStatusList;
    });
  }

  // On college change
  getByCollegeCode(value) {
    this.myArr = this.StudentStatusListArray;
    this.getByCollegeCodeInit(value);
  }

  onChangeAllColleges(){
    this.myArr = this.StudentStatusListArray;
    this.GetByCollegeCodeForStudentStatusSettingClass.StudentStatusList =  this.myArr;
  }

  customizeBtn() {
    this.getCollegesInit();
  }

  ngOnDestroy() {
    this.getByCollegeCodeInitSubscription.unsubscribe();
  }

  add(){
    this.GetByCollegeCodeForStudentStatusSettingClass.CollageCode = this.studentStatusFormAdd.get('CollageCode').value;
    this.StudentStatusSettingService.save(this.GetByCollegeCodeForStudentStatusSettingClass).subscribe(res => {
      this.StudentStatusSettingService.GetAvailableCollegesForStudentStatusSetting().subscribe(res => this.availableColleges = res);
      this.studentStatusFormAdd.patchValue({
        CollageCode: ''
      });
      this.getByCollegeCodeInit('');
      this.modalService.open(MyModalComponent, {icon: 'fa-check text-success', message: res.Message });
    });
  }

}
