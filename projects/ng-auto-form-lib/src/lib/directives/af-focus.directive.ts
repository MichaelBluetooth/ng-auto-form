import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from "@angular/core";

@Directive({
    selector: '[afFocus]'
})
export class AfFocusDirective implements OnChanges {

    @Input() afFocus: boolean;

    constructor(private el: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.afFocus && changes.afFocus.currentValue){
            this.el.nativeElement.focus();
        }        
    }
}
