import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'af-logical-field',
  templateUrl: './af-logical-field.component.html',
  styleUrls: ['./af-logical-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfLogicalFieldComponent),
    }
  ]
})
export class AfLogicalFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  logicalValue = null;
  disabled = false;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.logicalValue = value;
  }

  onValueChange(newValue: number) {
    this.logicalValue = newValue;
    this.onChangeCallback(this.logicalValue);
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
