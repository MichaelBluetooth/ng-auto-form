import { AfFieldValidation, AfFieldValidationName } from './../../../models/af-field.model';
import { FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { AfField, AfFieldType } from '../../../models/af-field.model';

@Component({
  selector: 'af-field',
  templateUrl: './af-field.component.html',
  styleUrls: ['./af-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfFieldComponent),
    }
  ]
})
export class AfFieldComponent implements ControlValueAccessor {

  @Input() form: FormGroup = null;
  @Input() field: AfField = null;

  innerValue: any = null;

  constructor() { }

  getLabelClass(): string {
    return 'label ' + (this.field.tooltip ? 'has-tooltip ' : '') + (this.isFieldRequired() ? 'label-required' : '');
  }

  isFieldRequired(): boolean {
    return this.field.validations && null != this.field.validations.find(val => val.name === AfFieldValidationName.Required);
  }

  isTextField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Text;
  }

  isNumberField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Number;
  }

  isListField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.List;
  }

  isMultiListField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.MultiList;
  }

  isDateField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Date;
  }

  isLogicalField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Logical;
  }

  isFileField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.File;
  }

  isMemoField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Memo;
  }

  isImageListField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.ImageList;
  }

  isRelationshipField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Relationship;
  }

  isLinkField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.Link;
  }

  isCASNumberField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.CASNumber;
  }

  isNFPAField(): boolean {
    return this.field && this.field.fieldType === AfFieldType.NFPA;
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  writeValue(value: any) {
    this.innerValue = value;
  }

  onValueChange(newValue: string) {
    this.innerValue = newValue;
    this.onChangeCallback(this.innerValue);
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
