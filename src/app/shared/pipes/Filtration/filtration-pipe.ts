import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtration'
})
export class FiltrationPipe implements PipeTransform {

  transform(arr: any[], term: string): any[] {
    return arr.filter(user => user.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())).slice(0,5);
  }

}
