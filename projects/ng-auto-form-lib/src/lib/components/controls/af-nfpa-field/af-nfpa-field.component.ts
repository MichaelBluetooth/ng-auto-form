import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'af-nfpa-field',
  templateUrl: './af-nfpa-field.component.html',
  styleUrls: ['./af-nfpa-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfNFPAFieldComponent),
    }
  ]
})
export class AfNFPAFieldComponent implements ControlValueAccessor {

  @Input() readOnly = false;
  @Input() focus = true;

  nfpaValue = {
    flamibility: null,
    health: null,
    instability: null,
    special: null
  };
  disabled = false;

  constructor() { }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    if (value) {
      this.nfpaValue = value;
    }
  }

  onFlamibilityChange(newValue: string) {
    this.nfpaValue.flamibility = newValue;
    this.onChangeCallback(this.nfpaValue);
  }

  onHealthChange(newValue: string) {
    this.nfpaValue.health = newValue;
    this.onChangeCallback(this.nfpaValue);
  }

  onSpecialChange(newValue: string) {
    this.nfpaValue.special = newValue;
    this.onChangeCallback(this.nfpaValue);
  }

  onInstabilityChange(newValue: string) {
    this.nfpaValue.instability = newValue;
    this.onChangeCallback(this.nfpaValue);
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
