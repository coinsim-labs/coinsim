import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
  transform(object, args:string[]) : any {
    let values = [];
    if(typeof  object !== 'undefined') {
      for(const key in object) {
        values.push(object[key]);
      }
    }
    return values;
  }
}
