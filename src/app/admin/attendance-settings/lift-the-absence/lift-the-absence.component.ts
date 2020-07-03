import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lift-the-absence',
  templateUrl: './lift-the-absence.component.html',
  styleUrls: ['./lift-the-absence.component.css']
})
export class LiftTheAbsenceComponent implements OnInit {

  liftAbsence: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.liftAbsence = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    })

  }

}
