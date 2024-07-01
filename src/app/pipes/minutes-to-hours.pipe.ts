import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours',
  standalone: true
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(input: number): string {
    let hours = Math.floor(input / 60);
    let minutes = Math.floor(input % 60);

    return `${hours}h  ${minutes}min`;
  }

}
