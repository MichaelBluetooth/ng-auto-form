import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'af-number-field',
  templateUrl: './af-number-field.component.html',
  styleUrls: ['./af-number-field.component.css']
})
export class AfNumberFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  numberValue = null;
  disabled = false;
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.numberValue = value;
  }

  onValueChange(newValue: number) {
    this.numberValue = newValue;
    this.onChangeCallback(this.numberValue);
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
