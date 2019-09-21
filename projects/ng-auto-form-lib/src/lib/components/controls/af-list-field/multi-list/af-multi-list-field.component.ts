import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { AfListOptionsPipe } from './../af-list-options.pipe';

@Component({
  selector: 'af-multi-list-field',
  templateUrl: './af-multi-list-field.component.html',
  styleUrls: ['./af-multi-list-field.component.css'],
  providers: [
    AfListOptionsPipe
  ]
})
export class AfMultiListFieldComponent implements ControlValueAccessor, OnInit {

  @Input() listOpts: any[] = [];
  @Input() displayFieldName = 'name';
  @Input() valueFieldName = 'id';
  @Input() size: number = null;
  @Input() readOnly = false;
  @Input() focus = false;

  selectedValue = null;
  disabled = false;
  filter = '';
  control: NgControl;

  constructor(private afListOptionsPipe: AfListOptionsPipe, ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  ngOnInit() {
    if (!this.displayFieldName) {
      this.displayFieldName = 'name';
    }

    if (!this.valueFieldName) {
      this.valueFieldName = 'id';
    }
  }

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
