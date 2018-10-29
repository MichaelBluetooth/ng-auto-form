import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'afTransformListOptions'
})
export class AfListOptionsPipe implements PipeTransform {
    transform(listOptions: any[], displayFieldName?: string, valueFieldName?: string, filter?: string): any[] {
        const tansformedListOptions: any[] = [];
        if (listOptions) {
            listOptions.forEach(listOpt => {
                if (null === listOpt || typeof (listOpt) === 'string' || typeof (listOpt) === 'number') {
                    tansformedListOptions.push({ display: listOpt, value: listOpt });
                } else {
                    tansformedListOptions.push({ display: listOpt[displayFieldName], value: listOpt[valueFieldName] });
                }
            });
        }
        return tansformedListOptions.filter(opt => !filter || (opt.display && opt.display.toLowerCase().indexOf(filter.toLowerCase()) > -1));
    }
}