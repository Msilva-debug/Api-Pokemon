import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeColorName',
})
export class PipeColorNamePipe implements PipeTransform {
  transform(value: string | undefined): unknown {
    return value === undefined || value === 'white' ? 'black' : value;
  }
  
}
