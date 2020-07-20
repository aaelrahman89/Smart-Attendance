import { Router } from '@angular/router';
import { AttendanceStatusDTO } from 'src/app/models/AttendanceStudents/AttendanceStatusDTO';
import { attendanceStatusService } from 'src/app/services/attendanceStatus.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AttendanceStudentsDataDTO } from 'src/app/models/AttendanceStudents/AttendanceStudentsUpdateDTO';
import { ModalDirective } from 'angular-bootstrap-md';
import { FilterAttendanceStudentsService } from 'src/app/services/FilterAttendanceStudents.service';
import { ModalService } from 'src/app/modal-service/modal-service.service';
import { MyModalComponent } from 'src/app/my-modal.component';


@Component({
  selector: 'attendance-record-cards',
  templateUrl: './attendance-record-cards.component.html',
  styleUrls: ['./attendance-record-cards.component.css']
})
export class AttendanceRecordCardsComponent implements OnInit {

  pageLang = document.documentElement.lang;
  @ViewChild('frame') frame: ModalDirective;

  //@inputs
  @Input() students: any[];
  @Input() attendanceStatus: AttendanceStatusDTO[];
  @Input() StudentsCount: number;
  @Input() showCards: boolean = false;
  @Input() showStatusBar: boolean = false;
  @Input() searchTerm: any = '';

  studentsFiltered = [];



  constructor(private FilterAttendanceStudentsService: FilterAttendanceStudentsService, private attendanceStatusService: attendanceStatusService, public Router: Router, public translate: TranslateService, private modalService: ModalService) { }

  ngOnInit(): void {


    // Translate Table (Ar & En)
    this.translate.onLangChange
      .subscribe((event: LangChangeEvent) => {
        if (event.lang == 'ar') {
          this.pageLang = event.lang;
        } if (event.lang == 'en') {
          this.pageLang = event.lang;
        }
      });

  }

    // change Attend & Absence only
    changeAttendAbsence(student) {
      if (student.AttendanceStatusCode == 1) {
        student.AttendanceStatusCode = 2;
      } else if (student.AttendanceStatusCode >= 2) {
        student.AttendanceStatusCode = 1
      }
      this.studentsFiltered.push(student);
    }

    // change all attendance status except Attend & Absence
    changeAttend(student, status) {
      student.AttendanceStatusCode = status.AttendanceStatusCode;
      this.studentsFiltered.push(student);
    }

      // Update all student status
  updateAllStudents() {
    this.FilterAttendanceStudentsService.UpdateAttendance(this.studentsFiltered).subscribe(res => {
      console.log('updated');
    });
  }

  // Calculation of attend status
  getAttendStatusLength(statusCode){
    return this.students.filter(x => x.AttendanceStatusCode == statusCode).length;
  }

  // Permission checks
  checkPermission(){
    return this.attendanceStatus.some(x => x.AttendanceStatusCode == 3);
  }
  checkexecuse(){
    return this.attendanceStatus.some(x => x.AttendanceStatusCode == 4);
  }
  checkLate(){
    return this.attendanceStatus.some(x => x.AttendanceStatusCode == 5);
  }




}
