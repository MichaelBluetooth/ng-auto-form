import { AfCasNumberValidationService } from './validation/af-cas-number-validation.service';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'af-cas-field',
  templateUrl: './af-cas-field.component.html',
  styleUrls: ['./af-cas-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfCasFieldComponent),
    }
  ]
})
export class AfCasFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = false;

  textValue = null;
  disabled = false;

  constructor(private casNumberValidatonService: AfCasNumberValidationService) { }

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

  isInvalidCASNo(): boolean {
    return !this.casNumberValidatonService.isValid(this.textValue);
  }
}
