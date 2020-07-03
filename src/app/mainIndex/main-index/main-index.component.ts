import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-index',
  templateUrl: './main-index.component.html',
  styleUrls: ['./main-index.component.css']
})
export class MainIndexComponent implements OnInit {

  constructor() { }

  userRole;
  ngOnInit(): void {
    this.userRole =  localStorage.getItem("UserRole")
    console.log(this.userRole )
  }

}
