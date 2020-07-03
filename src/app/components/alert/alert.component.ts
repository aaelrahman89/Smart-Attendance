import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalModule, WavesModule, InputsModule } from 'angular-bootstrap-md'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit, OnInit {

  @ViewChild ('frame', { static: true }) public frameModal: any;

  showModal: boolean = false;

  constructor() { }

  ngOnInit(): void {



  }

  ngAfterViewInit() {
    this.frameModal.show();
  }

}

//
