import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDeleteComponent } from 'src/app/components/alert-delete/alert-delete.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDeleteService  {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(AlertDeleteComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
    
    });
  }
}