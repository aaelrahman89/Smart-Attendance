export const AjaxFunc = (dataTablesParameters: any, callback, filter) => {
  const page = (parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length));
  filter.pageIndex = page;
  filter.pagelength = dataTablesParameters.length;

  filter.CollegeCode = this.srchForm.get('college').value;
  filter.DepartmentCode = this.srchForm.get('department').value;

  this.myService.GetAll2(filter)
    .subscribe(resp => {
      this.elements = resp.List;
      // this.sessionService.Set(resp.List[0]);
      console.log(" before call ", resp)
      callback({
        data: [],
        recordsTotal: resp.ResultPaging.RecordsTotal,
        recordsFiltered: resp.ResultPaging.RecordsFiltered
      });
    });
}
