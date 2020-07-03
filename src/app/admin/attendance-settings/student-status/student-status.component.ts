import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CollegeDTO } from 'src/app/models/CollegeDTO';
import { CollegeService } from 'src/app/services/college.service';
import { GetAvailableCollegesForStudentStatusSettingDTO } from 'src/app/models/admin/StudentStatusSetting/GetAvailableCollegesForStudentStatusSettingDTO';
import { StudentStatusSettingService } from 'src/app/services/admin/StudentStatusSetting/StudentStatusSetting.service';
import { GetByCollegeCodeForStudentStatusSettingDTO } from 'src/app/models/admin/StudentStatusSetting/GetByCollegeCodeForStudentStatusSettingDTO';

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
  studentStatusForm: FormGroup;
  getByCollegeCodeInitSubscription: Subscription;


  constructor(private CollegeService: CollegeService, private StudentStatusSettingService: StudentStatusSettingService) { }
  ngOnInit(): void {

    // Get Available Colleges
    this.StudentStatusSettingService.GetAvailableCollegesForStudentStatusSetting().subscribe(res => this.availableColleges = res);

    // Get By College Code on int for general settings
    this.getByCollegeCodeInit('');


    // init form
    this.studentStatusForm = new FormGroup({
      CollegeCode: new FormControl('')
    })


  }

  getCollegesInit() {
    this.CollegeService.GetAll().subscribe(res => {
      this.colleges = res.List;
      this.collFilteredLast = this.colleges.filter(item1 =>
        !this.availableColleges.some(item2 => (item2.CollegeCode === item1.CollegeCode)));
    });
  }


  getByCollegeCodeInit(collegeCode) {
    this.getByCollegeCodeInitSubscription = this.StudentStatusSettingService.GetByCollegeCode(collegeCode).subscribe(res => {
      console.log('ress', res);
      this.StudentStatusList = res;
    });
  }

  getByCollegeCode(value) {
    console.log('val', value);
  }

  customizeBtn() {
    this.getCollegesInit();
  }

  ngOnDestroy() {
    this.getByCollegeCodeInitSubscription.unsubscribe();
  }

}
