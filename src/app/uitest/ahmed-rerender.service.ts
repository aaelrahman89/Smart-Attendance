import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhmedRerenderService {


  constructor() { }

 // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 // We use this trigger because fetching the list can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<any> = new Subject();

 render;
 renderb;

 // Rerender Table
 rerender(){
   // Destroy the table first
   this.render = this.dtTrigger.unsubscribe();
   // Call the dtTrigger to rerender again
   this.renderb = this.dtTrigger.next();
   return this.renderb;
 }

}
