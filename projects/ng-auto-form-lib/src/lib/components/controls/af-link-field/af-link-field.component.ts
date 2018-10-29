import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'af-link-field',
  templateUrl: './af-link-field.component.html',
  styleUrls: ['./af-link-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfLinkFieldComponent),
    }
  ]
})
export class AfLinkFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  linkValue = {
    href: null,
    text: null
  };
  disabled = false;

  constructor() { }

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
