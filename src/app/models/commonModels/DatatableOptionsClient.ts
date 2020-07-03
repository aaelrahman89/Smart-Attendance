export const DatatableOptionsClient = {
  pagingType: 'full_numbers',
  pageLength: 10,
  dom: 'Bfrtip',
  // bDestroy: true,
  language: {
    url: `/assets/i18n/Arabic.json`
  },
  // retrieve: true,
  // Configure the buttons
  buttons: [
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


