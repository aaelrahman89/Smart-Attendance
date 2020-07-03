import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/services/college.service';
import { FilterModel } from 'src/app/models/commonModels/FilterModel';
import { CollegeDTO } from 'src/app/models/CollegeDTO';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  filter: FilterModel= new FilterModel();
  array: CollegeDTO[];
  test;
  constructor(private myService: CollegeService) {

    

   }

  ngOnInit(): void {
    this.filter.pageIndex = 0;
    this.filter.pageCount = 5;
    this.filter.pagelength = 10;

    this.myService.GetAll2(this.filter).subscribe( data =>  console.log(data)   );

  }

}
