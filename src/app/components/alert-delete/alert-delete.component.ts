import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'alert-delete',
  templateUrl: './alert-delete.component.html',
  styleUrls: ['./alert-delete.component.css']
})
export class AlertDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AlertDeleteComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}