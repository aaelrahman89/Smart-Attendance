import { Component, OnInit, ViewChild } from '@angular/core';
import { IntegrationMethodService } from 'src/app/services/admin/integration-method.service';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { IntegrationMetodDTO } from 'src/app/models/admin/integration-metod-dto';
@Component({
  selector: 'integration-way',
  templateUrl: './integration-way.component.html',
  styleUrls: ['./integration-way.component.css']
})
export class IntegrationWayComponent implements OnInit {

  constructor(private IntegrationMethodService: IntegrationMethodService) { }
  form
  @ViewChild('mainForm') mainForm: FormGroupDirective;
  elements;
  dropDown;
  Code;
  openModal: boolean = false;
  allData: IntegrationMetodDTO[];
  integrationServices: any = [];
  repeaterClasses: any = [];

  CustomModal(){
    this.openModal = !this.openModal
  }
  ngOnInit(): void {

    this.IntegrationMethodService.GetIntegrationMethodServices().subscribe( res => {
      // this.allData = res;
      console.log('resss', res);
      this.integrationServices = res.integrationServices;
      this.repeaterClasses = res.repeaterClasses;
      // console.log("res ", res[0].integrationServices[0].ServiceName);
      // this.dropDown = res.repeaterClasses;
      // this.elements = res.integrationServices;
      //  this.Code = res[0].TermCode;
      // this.form = new FormGroup({
      //   time : new FormControl(),
      //   date: new FormControl(),
      //   repeating: new FormControl()
      // });
    })
  }


  // submit(object) {
  //   this.openModal = !this.openModal;
  //   object.integrationServices.Time = this.form.get('time').value;
  //   object.integrationServices.Date = this.form.get('date').value;
  //   object.repeaterClasses.Name = this.form.get('repeating').value;
  //   this.IntegrationMethodService.Update(object).subscribe(res => {
  //     console.log(res)
  //   })
  // }

}

