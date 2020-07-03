import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mostafa',
  templateUrl: './mostafa.component.html',
  styleUrls: ['./mostafa.component.css']
})
export class MostafaComponent implements OnInit {

  constructor()  { }

ngOnInit() {
}

closeDialog(){
  
}
date = new FormControl(new Date());
serializedDate = new FormControl((new Date()).toISOString());

}