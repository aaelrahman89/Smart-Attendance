import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'attendance-settings',
  templateUrl: './attendance-settings.component.html',
  styleUrls: ['./attendance-settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AttendanceSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
