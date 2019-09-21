import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'af-image-list-field',
  templateUrl: './af-image-list-field.component.html',
  styleUrls: ['./af-image-list-field.component.css']
})
export class AfImageListFieldComponent implements ControlValueAccessor, OnInit {

  @Input() imageOptions: any[] = [];
  @Input() isMultiple = false;
  @Input() readOnly = false;

  selectedValue: string[] = null;
  showOptionsPane = false;
  selectableOptions: any[] = [];
  disabled = false;
  control: NgControl;

  constructor(private elementRef: ElementRef, ngControl: NgControl) {
    this.control = ngControl;
    this.control.valueAccessor = this;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  ngOnInit() {
    this.setSelectableValues();
  }

  writeValue(value: string | string[]) {
    this.selectedValue = Array.isArray(value) ? value : [value];
    this.setSelectableValues();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getUrlForValue(value: string) {
    const matchingOpt = this.imageOptions.find(opt => opt.value === value);
    if (matchingOpt) {
      return matchingOpt.imageUrl;
    } else {
      return '';
    }
  }

  setSelectableValues() {
    this.selectableOptions = this.imageOptions
      .filter(opt => null == this.selectedValue || null == this.selectedValue.find(val => val === opt.value));
  }

  toggleOptionsPane() {
    this.showOptionsPane = !this.showOptionsPane;
  }

  selectValue(value: string) {
    if (!this.readOnly && !this.disabled) {
      if (!this.selectedValue) {
        this.selectedValue = [];
      }

      if (this.isMultiple) {
        this.selectedValue.push(value);
      } else {
        this.selectedValue = [value];
      }
      this.onChangeCallback((!this.isMultiple && this.selectedValue) ? this.selectedValue[0] : this.selectedValue);
      this.setSelectableValues();
    }
  }

  removeValue(value: string) {
    if (!this.readOnly && !this.disabled) {
      this.selectedValue.splice(this.selectedValue.indexOf(value), 1);
      if (this.selectedValue.length === 0) {
        this.selectedValue = null;
      }
      this.onChangeCallback((this.selectedValue && !this.isMultiple) ? this.selectedValue[0] : this.selectedValue);
      this.setSelectableValues();
    }
  }

  getButtonText() {
    if (this.selectableOptions.length === 0) {
      return 'No more options';
    } else if (this.showOptionsPane) {
      return 'Click to hide options';
    } else {
      return 'Click to view options';
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showOptionsPane = false;
    }
  }
}
