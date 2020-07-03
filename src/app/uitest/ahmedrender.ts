import { Subject } from 'rxjs';

export class Ahmedrender {

   // Must be declared as "any", not as "DataTables.Settings"
 dtOptions: any = {};
 // We use this trigger because fetching the list can be quite long,
 // thus we ensure the data is fetched before rendering
 dtTrigger: Subject<any> = new Subject();

 // Rerender Table
 rerender(){
   // Destroy the table first
   this.dtTrigger.unsubscribe();
   // Call the dtTrigger to rerender again
   this.dtTrigger.next();
 }

}
