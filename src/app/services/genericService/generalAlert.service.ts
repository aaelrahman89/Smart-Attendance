import { GeneralAlertComponent } from './../../components/general-alert/general-alert.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class generalAlertservice  {


    constructor(private dialog: MatDialog) { }

  openAlertSuccess(){
   return this.dialog.open(GeneralAlertComponent,{
      width: '390px',
    panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      
    
    });
  }
}