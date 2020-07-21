
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { DatatableOptions } from 'src/app/models/commonModels/DatatableOptions';

@Component({
  selector: 'ahmed-app',
  templateUrl: './ahmed.component.html',
  styleUrls: ['./ahmed.component.css']
})
export class AhmedComponent implements OnDestroy, OnInit {



 constructor(public  translate: TranslateService ) {}


 ngOnInit(): void {


 }




ngAfterViewInit(): void {

}

ngOnDestroy(): void {

}

// name: string;

// onChangeFile(e){
//    console.log(e.target.files[0]);
//    this.name = e.target.files[0].name;
// }



latitude: number;
longitude: number;
showMap:boolean = false;

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.showMap = true;
    });
  }

}




//   showPosition(position) {
//     this.latitude = position.coords.latitude;
//     this.longitude = position.coords.longitude;
// }


}
