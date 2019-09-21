import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'af-link-field',
  templateUrl: './af-link-field.component.html',
  styleUrls: ['./af-link-field.component.css']
})
export class AfLinkFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  linkValue = {
    href: null,
    text: null
  };
  disabled = false;
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  onTouchedCallback: () => void = () => { };
  onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (value) {
      this.linkValue = value;
    }
  }

  onValueChange() {
    this.onChangeCallback(this.linkValue);
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
