import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'af-text-field',
  templateUrl: './af-text-field.component.html',
  styleUrls: ['./af-text-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfTextFieldComponent),
    }
  ]
})
export class AfTextFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  textValue = null;
  disabled = false;

  constructor() { }

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
