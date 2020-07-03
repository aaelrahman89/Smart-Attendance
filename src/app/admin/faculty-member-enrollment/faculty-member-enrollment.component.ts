import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacultyMemberEnrollmentService } from 'src/app/services/admin/facultyMemberEnrollment/faculty-member-enrollment.service';
import { FacultyMemberEnrollmentDTO } from 'src/app/models/facultyMemberEnrollment/faculty-member-enrollment-dto';
import { Subject } from 'rxjs';
@Component({
  selector: 'faculty-member-enrollment',
  templateUrl: './faculty-member-enrollment.component.html',
  styleUrls: ['./faculty-member-enrollment.component.css']
})
export class FacultyMemberEnrollmentComponent implements OnInit, OnDestroy {

    // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  dtOptionstwo: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<FacultyMemberEnrollmentDTO> = new Subject();
  dtTriggerTwo: Subject<FacultyMemberEnrollmentDTO> = new Subject();
  elements: FacultyMemberEnrollmentDTO[];

  constructor(private myService : FacultyMemberEnrollmentService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "oLanguage": { "sSearch": "" } ,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'pageLength',
        {
          extend:    'print',
          text:      '<i class="fas fa-print"></i>',
          titleAttr: 'print'
      },
        {
          extend:    'copyHtml5',
          text:      '<i class="far fa-copy"></i>',
          titleAttr: 'Copy'
        },
        {
          extend:    'excelHtml5',
          text:      '<i class="far fa-file-excel"></i>',
          titleAttr: 'Excel'
      }
      ]
    };
   

        // Get Data
    this.myService.GetAll().subscribe(res =>
          {
          
          this.elements = res.List;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
          }
        );
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTriggerTwo.unsubscribe();
  } 
  
  popupElements
  stop;
  showUp(passElements){
    this.popupElements = passElements
    this.myService.GetById(passElements).subscribe(
      res =>
      {     
        this.popupElements = res;
        // this.dtTriggerTwo.next();
        this.stop = true;
        console.log(this.popupElements)

      }  
    ); 
  }

}
