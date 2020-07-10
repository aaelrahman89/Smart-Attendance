import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'dynamic-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // @ViewChild('documentEditForm') documentEditForm: FormGroupDirective; 

  @Output() submitParent = new EventEmitter();
 
  @Output() closeModal= new EventEmitter();
 

  constructor() { }

  ngOnInit(): void {
  }
  saveToParent(){
    this.submitParent.emit();
  }
  close(){ 
   this.closeModal.emit()
  }
}
