import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AfListOptionsPipe } from './../af-list-options.pipe';

@Component({
  selector: 'af-multi-list-field',
  templateUrl: './af-multi-list-field.component.html',
  styleUrls: ['./af-multi-list-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfMultiListFieldComponent),
    },
    AfListOptionsPipe
  ]
})
export class AfMultiListFieldComponent implements ControlValueAccessor {

  @Input() listOpts: any[] = [];
  @Input() displayFieldName = 'name';
  @Input() valueFieldName = 'id';
  @Input() size: number = null;
  @Input() readOnly = false;
  @Input() focus = false;

  selectedValue = null;
  disabled = false;
  filter = '';

  constructor(private afListOptionsPipe: AfListOptionsPipe) { }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any[]) {
    this.selectedValue = value;
  }

  onValueChange(newValue: any) {
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
    const opts = this.afListOptionsPipe.transform(this.listOpts, this.displayFieldName, this.valueFieldName);
    return opts.filter(opt => this.selectedValue.find(val => val === opt.value)).map(opt => opt.display);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isOptVisible(display: string) {
    return display.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 || this.filter === '';
  }
}
