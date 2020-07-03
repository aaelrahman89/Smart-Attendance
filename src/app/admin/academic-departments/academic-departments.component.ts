import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'academic-departments',
  templateUrl: './academic-departments.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AcademicDepartmentsComponent implements OnInit {
  pageTitle = 'إدارة الشعب الدراسية';
  // Must be declared as "any", not as "DataTables.Settings"
  dtOptions: any = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering

  // dtTrigger: Subject<DeptartmentDTO> = new Subject() .;
  headElements: string[] = [
    '#',
    'College', // اسم الكليه
    'Scheduled code', // كود المقرر
    'Scheduled Name', // اسم المقرر
    'Semester', // الفصل الدراسي
    'Number of classes', // عدد الشعب الدراسية
    'Scheduled status', // حاله المقرر
    'Management tools', // ادوات الاداره
  ];

  elements: any = [
    {
      College: 'Mark',
      Scheduledcode: 'Otto',
      ScheduledName: '@mdo',
      Semester: '@mdo',
      Numberclasses: '@mdo',
      Scheduledstatus: '@mdo',
    },
    {
      College: 'Mark',
      Scheduledcode: 'Otto',
      ScheduledName: '@mdo',
      Semester: '@mdo',
      Numberclasses: '@mdo',
      Scheduledstatus: '@mdo',
    },
    {
      College: 'Mark',
      Scheduledcode: 'Otto',
      ScheduledName: '@mdo',
      Semester: '@mdo',
      Numberclasses: '@mdo',
      Scheduledstatus: '@mdo',
    },
    {
      College: 'Mark',
      Scheduledcode: 'Otto',
      ScheduledName: '@mdo',
      Semester: '@mdo',
      Numberclasses: '@mdo',
      Scheduledstatus: '@mdo',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
      // Configure the buttons
      buttons: [
        'pageLength',
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i>',
          titleAttr: 'print',
        },
        {
          extend: 'copyHtml5',
          text: '<i class="far fa-copy"></i>',
          titleAttr: 'Copy',
        },
        {
          extend: 'excelHtml5',
          text: '<i class="far fa-file-excel"></i>',
          titleAttr: 'Excel',
        },
      ],
    };
  }
}
