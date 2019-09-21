import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'af-date-field',
    templateUrl: './af-date-field.component.html',
    styleUrls: ['./af-date-field.component.css']
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
    control: NgControl;

    constructor(ngControl: NgControl) {
        this.control = ngControl;
        this.control.valueAccessor = this;
    }

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
