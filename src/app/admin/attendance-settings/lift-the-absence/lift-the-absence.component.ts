import { LiftAbsenceSettingDTO } from './../../../models/admin/LiftAbsenceSetting/LiftAbsenceSettingDTO';
import { LiftAbsenceSettingService } from './../../../services/admin/LiftAbsenceSetting/LiftAbsenceSetting.service';
import { CollegeDTO } from 'src/app/models/CollegeDTO';
import { CollegeService } from './../../../services/college.service';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'lift-the-absence',
  templateUrl: './lift-the-absence.component.html',
  styleUrls: ['./lift-the-absence.component.css']
})
export class LiftTheAbsenceComponent implements OnInit {

  liftAbsence: FormGroup;
  colleges: CollegeDTO[];
  collFilteredLast: any = [];
  AvailableColleges: LiftAbsenceSettingDTO[];

    // confirmation modal
    @ViewChild('mainForm') mainForm: FormGroupDirective;
    @ViewChild('basicModal') basicModal;
    openModal: boolean = false;
    openModalActivate: boolean = false;
    openModalDelete: boolean = false;

  constructor(private CollegeService: CollegeService, private LiftAbsenceSettingService: LiftAbsenceSettingService) { }

  getCollegesInit() {
    this.CollegeService.GetAll().subscribe(res => {
      this.colleges = res.List;
      this.collFilteredLast = this.colleges.filter(item1 =>
        !this.AvailableColleges.some(item2 => (item2.CollegeCode === item1.CollegeCode)));
    });
  }

  ngOnInit(): void {

    // Get Colleges
    this.getCollegesInit();






    // Get Available Colleges
    this.GetAvailableCollegesInit();

    // init form
    this.liftAbsence = new FormGroup({
      CollegeCode: new FormControl(null),
      StartDate: new FormControl(''),
      EndDate: new FormControl('')
    })

  }

  // Get Available Colleges Init
  GetAvailableCollegesInit(){
    this.LiftAbsenceSettingService.GetAvailableCollegesForLiftAbsenceSetting().subscribe(res => this.AvailableColleges = res);
  }

  add(){
    this.LiftAbsenceSettingService.Save(this.liftAbsence.value).subscribe(res => {
        this.openModal = !this.openModal;
        this.basicModal.hide();
        this.GetAvailableCollegesInit();
    });
  }


  // Activate Period
  activatePeriod(CollegeCode){
    this.LiftAbsenceSettingService.IsActive(CollegeCode).subscribe(res => {
      this.openModalActivate = !this.openModalActivate;
      this.basicModal.hide();
      this.GetAvailableCollegesInit();
    });
  }

  // Delete Period
  deletePeriod(CollegeCode){
    this.LiftAbsenceSettingService.DeleteLiftAbsence(CollegeCode).subscribe(res => {
      this.openModalDelete = !this.openModalDelete;
        this.basicModal.hide();
        this.GetAvailableCollegesInit();
    });
  }


}
