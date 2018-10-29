import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'af-file-field',
  templateUrl: './af-file-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfFileFieldComponent),
    }
  ]
})
export class AfFileFieldComponent implements ControlValueAccessor {

  @Input() acceptedfileTypes = '';

  fileList: FileList = null;

  constructor() { }

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
