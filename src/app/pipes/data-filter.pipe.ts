import { CollegeDTO } from './../models/CollegeDTO';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(data: CollegeDTO[], searchTerm: string): unknown {
    if(!data || !searchTerm){
      return data;
    }
    return data.filter(val => val.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
