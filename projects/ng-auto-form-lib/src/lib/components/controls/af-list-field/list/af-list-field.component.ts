import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl } from '@angular/forms';
import { AfListOptionsPipe } from './../af-list-options.pipe';

@Component({
  selector: 'af-list-field',
  templateUrl: './af-list-field.component.html',
  styleUrls: ['./af-list-field.component.css'],
  providers: [
    AfListOptionsPipe
  ]
})
export class AfListFieldComponent implements ControlValueAccessor {

  @Input() listOpts: any[] = [];
  @Input() displayFieldName = 'name';
  @Input() valueFieldName = 'id';
  @Input() readOnly = false;
  @Input() focus = false;
  @Input() size = null;

  selectedValue = null;
  disabled = false;
  control: NgControl;

  constructor(private afListOptionsPipe: AfListOptionsPipe, ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.selectedValue = value;
  }

  onValueChange(newValue: string) {
    this.selectedValue = newValue;
    this.onChangeCallback(this.selectedValue);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getDisplayValues(): string[] {
    const matchedOpt = this.afListOptionsPipe.transform(this.listOpts, this.displayFieldName, this.valueFieldName)
      .find(opt => opt.value === this.selectedValue);
    return matchedOpt ? [matchedOpt.display] : [];
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
