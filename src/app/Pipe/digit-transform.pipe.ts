// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'digitTransform'
})
// THIS PIPE WILL TAKE INPUT AS NUMBER AND TRANSFORM IT TO ARABIC
export class DigitTransformation implements PipeTransform {
   async transform(value: string, language:string) {
    if(value != undefined){
        console.log("number",value);
        if(language === 'ar'){
            let convert = value.toString();
        return  value
        } else {
            return value
        }
    }
}
}