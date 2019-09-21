import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'af-file-field',
  templateUrl: './af-file-field.component.html',
})
export class AfFileFieldComponent implements ControlValueAccessor {

  @Input() acceptedfileTypes = '';

  fileList: FileList = null;
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
  }

  onValueChange(evt: any) {
    this.fileList = evt.target.files;
    this.onChangeCallback(this.fileList);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
