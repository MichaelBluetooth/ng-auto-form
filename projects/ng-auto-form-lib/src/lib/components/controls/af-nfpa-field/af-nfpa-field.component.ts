import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'af-nfpa-field',
  templateUrl: './af-nfpa-field.component.html',
  styleUrls: ['./af-nfpa-field.component.css']
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
  control: NgControl;

  constructor(ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

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
