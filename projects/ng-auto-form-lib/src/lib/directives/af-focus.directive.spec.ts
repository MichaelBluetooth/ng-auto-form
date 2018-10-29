import {ElementRef, SimpleChanges, SimpleChange} from '@angular/core';
import {fakeAsync} from "@angular/core/testing";
import { AfFocusDirective } from './af-focus.directive';

describe('CISProFieldFocusDirective', () => {
    let fieldFocusDirective: AfFocusDirective;
    let element: any;
    let elementRef: ElementRef;
    let nativeElement: any;
    
    beforeEach(() => {
        nativeElement = jasmine.createSpyObj('nativeElement', ['focus']);
        nativeElement.focus.and.callFake(() => {});
        elementRef = new ElementRef(nativeElement);
        fieldFocusDirective = new AfFocusDirective(elementRef);
    });

    it('should focus the element appropriately', fakeAsync(() => {
        let changesObj: SimpleChanges = {
            afFocus: new SimpleChange(true, true, false)
        };
        fieldFocusDirective.ngOnChanges(changesObj);
        expect(nativeElement.focus).toHaveBeenCalled();
    }));
});

