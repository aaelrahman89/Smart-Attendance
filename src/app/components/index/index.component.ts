import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { faBookmark, faCircle } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  title = 'smartAttendance';
  faBookmark = faBookmark;
  faCircle = faCircle; 
  charts: any[];
  highstudentsCharts;
  lowstudentsCharts;
  selectSubject;
  // url vars 
  highestStudnets = `students-Charts`;
  subjectUrl = `subject-charts`;
  subjects = `subjects`;
  lowestStudents = `students-Charts-low`;
  constructor( private dashboardCharts: DashboardService, private http: HttpClient) {
  }


  ngOnInit(): void {
    // get students for low grid data 
    this.dashboardCharts.gettingAllData(this.lowestStudents).subscribe( data => this.lowstudentsCharts = data)
    // get students for high grid data 
    this.dashboardCharts.gettingAllData(this.highestStudnets).subscribe( data => this.highstudentsCharts = data)
    // get subjects charts data 
    this.dashboardCharts.gettingAllData(this.subjectUrl).subscribe( data => this.charts = data)
    // get subjects for the dropdown
    this.dashboardCharts.gettingAllData(this.subjects).subscribe( data => this.selectSubject = data)
  }

//  gettingAllData(url, array){
//    this.dashboardCharts.gettingAllData(url).subscribe( data =>  array = data)
//  }
  // reset Result on click on the clear button:-
  resetFilter(selectSub, tableType) {
    if ( tableType === 'high') this.dashboardCharts.gettingAllData(this.highestStudnets).subscribe( data => this.highstudentsCharts = data);
    if ( tableType === 'low') this.dashboardCharts.gettingAllData(this.lowestStudents).subscribe( data => this.lowstudentsCharts = data);
    selectSub.selectedIndex = 0;
  }

  // filter on selected subject for the highest attendance rate card 
  changeSubject(selectSub, listType, string) {
    listType;  // detect high or low attendance array type
    string; // detect if this high attendance or low attendance table type
    let dynamic;
    if (string === 'high')   dynamic = this.highestStudnets ; // showing new filtered array
    if (string === 'low')   dynamic = this.lowestStudents; 
    // first reset the array:-
    this.dashboardCharts.gettingAllData(dynamic).subscribe(
      data => listType = data,
      error => "nothing to do!",
    // then  make new array from reseted array with the new filter result:-
      () => {
        var selected = selectSub.value //selected value from the dropdown input
        var studentObject = listType; //original array
        var newArray = []; // new filterd array 
        var i; // loop fills the new array with selected value
        for (i = 0; i < studentObject.length; i++) {
          for (let item in studentObject[i]) {
            if (studentObject[i][item].toString().indexOf(selected) != -1) {
              newArray.push(studentObject[i])
            }
          }
        }
        if (string === 'high') this.highstudentsCharts = newArray ; // showing new filtered array
        if (string === 'low') this.lowstudentsCharts = newArray; // showing new filtered array
      })
  }

 
}



