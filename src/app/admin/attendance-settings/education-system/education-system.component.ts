import { GetByCollegeCodeDTO, AttendanceSetting } from './../../../models/admin/AttendanceSetting/GetByCollegeCodeDTO';
import { AvailableCollegesDTO } from './../../../models/admin/AttendanceSetting/AvailableCollegesDTO';
import { AttendanceSettingService } from './../../../services/admin/AttendanceSetting/AttendanceSetting.service';
import { AttendanceStatusDTO } from './../../../models/AttendanceStudents/AttendanceStatusDTO';
import { attendanceStatusService } from './../../../services/attendanceStatus.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CollegeService } from 'src/app/services/college.service';

import { CollegeDTO } from '../../../models/CollegeDTO';
import { ModalDirective } from 'angular-bootstrap-md';



@Component({
  selector: 'education-system',
  templateUrl: './education-system.component.html',
  styleUrls: ['./education-system.component.css']
})
export class EducationSystemComponent implements OnInit {

  colleges: CollegeDTO[];
  collegesFiltered: any = [];
  attendanceStatus: AttendanceStatusDTO[];
  availableColleges: AvailableCollegesDTO[];
  collFilteredLast: any = [];
  showSettings: boolean = false;
  showAlert: boolean = false;

  UpdateCollegeCodeData: GetByCollegeCodeDTO;
  AddCollegeCodeData: GetByCollegeCodeDTO = new GetByCollegeCodeDTO();

  attendanceSettingObj: AttendanceSetting = new AttendanceSetting();

  @ViewChild('frame') frame: ModalDirective;

  customize: boolean = false;


  educationForm: FormGroup;
  constructor(private AttendanceSettingService: AttendanceSettingService, private CollegeService: CollegeService, private attendanceStatusService: attendanceStatusService) { }

  getAvailableCollegesInit() {
    this.AttendanceSettingService.GetAvailableCollegesForAttendanceSetting().subscribe(res => this.availableColleges = res);
  }


  getCollegesInit() {
    this.CollegeService.GetAll().subscribe(res => {
      this.colleges = res.List;
      this.collFilteredLast = this.colleges.filter(item1 =>
        !this.availableColleges.some(item2 => (item2.CollegeCode === item1.CollegeCode)));
    });
  }

  ngOnInit(): void {

    // Get Available Colleges on page load
    this.getAvailableCollegesInit();

    // init form
    this.educationForm = new FormGroup({
      CollegeCode: new FormControl(''),
      LearningSystemTypeId: new FormControl('1'),
      attend: new FormControl(false),
      absence: new FormControl(false),
      permission: new FormControl(false),
      permissionAllowedCount: new FormControl('0'),
      permissionPrecentage: new FormControl('0'),
      permissionGrantAuthorityFacultyMember: new FormControl(false),
      permissionCalculatedToStatusCode: new FormControl('1'),
      execuse: new FormControl(false),
      execusePrecentage: new FormControl('0'),
      execuseGrantAuthorityFacultyMember: new FormControl(false),
      execuseCalculatedToStatusCode: new FormControl('1'),
      late: new FormControl(false),
      latePrecentage: new FormControl('0'),
      lateGrantAuthorityFacultyMember: new FormControl(false),
      lateCalculatedToStatusCode: new FormControl('1')
    })

    // GetByCollegeCode on load (for general settings)
    this.getCollegePatchValue('');

  }

  // patch values
  getCollegePatchValue(collegeCode) {
    this.AttendanceSettingService.GetByCollegeCode(collegeCode).subscribe(res => {
      this.showSettings = true;
      this.UpdateCollegeCodeData = res;

      // update form value with new value
      this.educationForm.patchValue({
        // CollegeCode: res.CollegeCode,
        LearningSystemTypeId: res.LearningSystemTypeId,
        attend: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 1).IsActive,
        absence: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 2).IsActive,
        permission: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 3).IsActive,
        permissionAllowedCount: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 3).AllowedCount,
        permissionPrecentage: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 3).AttendancePrecentage,
        permissionGrantAuthorityFacultyMember: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 3).GrantAuthorityFacultyMember,
        permissionCalculatedToStatusCode: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 3).CalculatedToStatusCode,
        execuse: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 4).IsActive,
        execusePrecentage: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 4).AttendancePrecentage,
        execuseGrantAuthorityFacultyMember: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 4).GrantAuthorityFacultyMember,
        execuseCalculatedToStatusCode: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 4).CalculatedToStatusCode,
        late: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 4).IsActive,
        latePrecentage: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 5).AttendancePrecentage,
        lateGrantAuthorityFacultyMember: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 5).GrantAuthorityFacultyMember,
        lateCalculatedToStatusCode: res.AttendanceSetting.find(x => x.AttendanceStatusCode == 5).CalculatedToStatusCode
      });


    })
  };


  // GetByCollegeCode on change (for colleges settings)
  onavailableCollegeChange(collegeCode) {
    this.getCollegePatchValue(collegeCode);
  }


  onSubmitInit() {
    this.UpdateCollegeCodeData.CollegeCode = this.educationForm.get('CollegeCode').value;
    this.UpdateCollegeCodeData.LearningSystemTypeId = this.educationForm.get('LearningSystemTypeId').value;
    this.UpdateCollegeCodeData.AttendanceSetting.forEach(st => {
      switch (st.AttendanceStatusCode) {
        case 1:
          st.IsActive = this.educationForm.get('attend').value;
          st.AllowedCount = null;
          st.AttendancePrecentage = null;
          st.GrantAuthorityFacultyMember = null;
          st.CalculatedToStatusCode = null;
          break;
        case 2:
          st.IsActive = this.educationForm.get('absence').value;
          st.AllowedCount = null;
          st.AttendancePrecentage = null;
          st.GrantAuthorityFacultyMember = null;
          st.CalculatedToStatusCode = null;
          break;
        case 3:
          st.IsActive = this.educationForm.get('permission').value;
          st.AllowedCount = this.educationForm.get('permissionAllowedCount').value;
          st.AttendancePrecentage = this.educationForm.get('permissionPrecentage').value;
          st.GrantAuthorityFacultyMember = this.educationForm.get('permissionGrantAuthorityFacultyMember').value;
          st.CalculatedToStatusCode = this.educationForm.get('permissionCalculatedToStatusCode').value;
          break;
        case 4:
          st.IsActive = this.educationForm.get('execuse').value;
          st.AttendancePrecentage = this.educationForm.get('execusePrecentage').value;
          st.GrantAuthorityFacultyMember = this.educationForm.get('execuseGrantAuthorityFacultyMember').value;
          st.CalculatedToStatusCode = this.educationForm.get('execuseCalculatedToStatusCode').value;
          break;
        case 5:
          st.IsActive = this.educationForm.get('late').value;
          st.AttendancePrecentage = this.educationForm.get('latePrecentage').value;
          st.GrantAuthorityFacultyMember = this.educationForm.get('lateGrantAuthorityFacultyMember').value;
          st.CalculatedToStatusCode = this.educationForm.get('lateCalculatedToStatusCode').value;
          break;

        default:
          break;
      }
    });
    console.log('data', this.UpdateCollegeCodeData);
    this.AttendanceSettingService.save(this.UpdateCollegeCodeData).subscribe(res => {
      // Sucess alert popup here
      this.frame.show();
    });
  }

  onSubmitAddInit() {
    this.AddCollegeCodeData.CollegeCode = this.educationForm.get('CollegeCode').value;
    this.AddCollegeCodeData.LearningSystemTypeId = this.educationForm.get('LearningSystemTypeId').value;
    this.AddCollegeCodeData.AttendanceSetting = [];
    this.attendanceSettingObj = new AttendanceSetting();
    this.attendanceSettingObj.AttendanceStatusCode = 1;
    this.attendanceSettingObj.IsActive = this.educationForm.get('attend').value;
    this.attendanceSettingObj.AllowedCount = null;
    this.attendanceSettingObj.AttendancePrecentage = null;
    this.attendanceSettingObj.GrantAuthorityFacultyMember = null;
    this.attendanceSettingObj.CalculatedToStatusCode = null;
    this.AddCollegeCodeData.AttendanceSetting.push(this.attendanceSettingObj);
    // case 2:
    this.attendanceSettingObj = new AttendanceSetting();
    this.attendanceSettingObj.AttendanceStatusCode = 2;
    this.attendanceSettingObj.IsActive = this.educationForm.get('absence').value;
    this.attendanceSettingObj.AllowedCount = null;
    this.attendanceSettingObj.AttendancePrecentage = null;
    this.attendanceSettingObj.GrantAuthorityFacultyMember = null;
    this.attendanceSettingObj.CalculatedToStatusCode = null;
    this.AddCollegeCodeData.AttendanceSetting.push(this.attendanceSettingObj);
    // case 3:
    this.attendanceSettingObj = new AttendanceSetting();
    this.attendanceSettingObj.AttendanceStatusCode = 3;
    this.attendanceSettingObj.IsActive = this.educationForm.get('permission').value;
    this.attendanceSettingObj.AllowedCount = this.educationForm.get('permissionAllowedCount').value;
    this.attendanceSettingObj.AttendancePrecentage = this.educationForm.get('permissionPrecentage').value;
    this.attendanceSettingObj.GrantAuthorityFacultyMember = this.educationForm.get('permissionGrantAuthorityFacultyMember').value;
    this.attendanceSettingObj.CalculatedToStatusCode = this.educationForm.get('permissionCalculatedToStatusCode').value;
    this.AddCollegeCodeData.AttendanceSetting.push(this.attendanceSettingObj);
    // break;
    // case 4:
    this.attendanceSettingObj = new AttendanceSetting();
    this.attendanceSettingObj.AttendanceStatusCode = 4;
    this.attendanceSettingObj.IsActive = this.educationForm.get('execuse').value;
    this.attendanceSettingObj.AttendancePrecentage = this.educationForm.get('execusePrecentage').value;
    this.attendanceSettingObj.GrantAuthorityFacultyMember = this.educationForm.get('execuseGrantAuthorityFacultyMember').value;
    this.attendanceSettingObj.CalculatedToStatusCode = this.educationForm.get('execuseCalculatedToStatusCode').value;
    this.AddCollegeCodeData.AttendanceSetting.push(this.attendanceSettingObj);
    //   break;
    // case 5:
    this.attendanceSettingObj = new AttendanceSetting();
    this.attendanceSettingObj.AttendanceStatusCode = 5;
    this.attendanceSettingObj.IsActive = this.educationForm.get('late').value;
    this.attendanceSettingObj.AttendancePrecentage = this.educationForm.get('latePrecentage').value;
    this.attendanceSettingObj.GrantAuthorityFacultyMember = this.educationForm.get('lateGrantAuthorityFacultyMember').value;
    this.attendanceSettingObj.CalculatedToStatusCode = this.educationForm.get('lateCalculatedToStatusCode').value;
    this.AddCollegeCodeData.AttendanceSetting.push(this.attendanceSettingObj);
    //   break;

    this.AttendanceSettingService.save(this.AddCollegeCodeData).subscribe(res => {
      console.log(res);
      this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
      this.getAvailableCollegesInit();
    });
  }


  customizeBtn() {
    this.getCollegesInit();
    this.educationForm.patchValue({
      LearningSystemTypeId: 1
    })
  }




}
