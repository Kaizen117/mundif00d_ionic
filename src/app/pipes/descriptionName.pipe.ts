import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'descriptionName'
})
export class NamePipe implements PipeTransform {

    transform(value: string, ...args: any[]): any {
        //console.log(value);
        if(args[0]){
            return value.substring(0, 10);
        }else{
            return value;
        }        
    } 

}