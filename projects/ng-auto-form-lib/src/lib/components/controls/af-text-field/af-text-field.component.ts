import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'af-text-field',
  templateUrl: './af-text-field.component.html',
  styleUrls: ['./af-text-field.component.css']
})
export class AfTextFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  textValue = null;
  disabled = false;
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.textValue = value;
  }

  onValueChange(newValue: string) {
    this.textValue = newValue;
    this.onChangeCallback(this.textValue);
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
