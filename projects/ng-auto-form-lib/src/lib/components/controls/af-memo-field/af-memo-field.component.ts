import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'af-memo-field',
  templateUrl: './af-memo-field.component.html',
  styleUrls: ['./af-memo-field.component.css']
})
export class AfMemoFieldComponent implements ControlValueAccessor, OnInit {

  @Input() rows = 6;
  @Input() cols = 40;
  @Input() readOnly = false;
  @Input() focus = false;

  memoValue = null;
  disabled = false;
  defaultRows = 6;
  defaultCols = 30;
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  ngOnInit() {
    if (!this.rows) {
      this.rows = this.defaultRows;
    }

    if (this.cols) {
      this.cols = this.defaultCols;
    }
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.memoValue = value;
  }

  onValueChange(newValue: number) {
    this.memoValue = newValue;
    this.onChangeCallback(this.memoValue);
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
