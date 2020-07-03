import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'facultymember-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit { 

  expanded= false;
  blurBg = false;
  notification = false;
  blackAndWhite = false;

  close(){
    this.expanded =false;
    this.blurBg = false;
    this.notification = false;
  }
  
  expand(){
    this.expanded = !this.expanded;
    this.blurBg = !this.blurBg;
  }
  notify(){
    this.blurBg = !this.blurBg;
    this.notification = !this.notification;

  }
  constructor(private modalService: NgbModal ) {
  }
  specialColors(){
    this.blackAndWhite = !this.blackAndWhite;
    if(this.blackAndWhite == true) document.body.classList.add('specialColors');
    else document.body.classList.remove('specialColors');
  }
  ngOnInit(){
  }

}
