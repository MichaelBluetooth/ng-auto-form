import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'af-date-field',
    templateUrl: './af-date-field.component.html',
    styleUrls: ['./af-date-field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AfDateFieldComponent),
        }
    ]
})
export class AfDateFieldComponent implements OnInit, ControlValueAccessor {

    @Input() dateMask = 'MM/DD/YYYY';
    @Input() minDate: Date = null;
    @Input() maxDate: Date = null;
    @Input() readOnly = false;
    @Input() focus = false;

    dateValue = null;
    bsConfig = {
        dateInputFormat: 'MM/DD/YYYY'
    };
    disabled = false;

    constructor() { }

    ngOnInit() {
        this.bsConfig = {
            dateInputFormat: this.dateMask
        };
    }

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: any) => void = () => { };

    writeValue(value: any) {
        if (value) {
            this.dateValue = new Date(value);
        }
    }

    onValueChange(newValue: Date) {
        let valueToEmitToForm = null;
        if (Object.prototype.toString.call(newValue) === '[object Date]' && false === isNaN(newValue.getTime())) {
            this.dateValue = newValue;
            valueToEmitToForm = newValue.toISOString();
        } else {
            this.dateValue = null;
        }
        this.onChangeCallback(valueToEmitToForm);
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
