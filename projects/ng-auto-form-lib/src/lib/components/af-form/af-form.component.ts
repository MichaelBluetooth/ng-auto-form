import { AfFormBuilderService } from './af-form-builder.service';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AfForm } from '../../models/af-form.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AfField } from '../../models/af-field.model';

@Component({
  selector: 'af-form',
  templateUrl: './af-form.component.html',
  styleUrls: ['./af-form.component.css']
})
export class AfFormComponent implements OnInit, OnChanges {

  /** The meta data describing the form */
  @Input() formDefinition: AfForm;

  /** The data the form should render */
  @Input() formData: any = null;

  /** When any value is changed */
  @Output() formDataChange = new EventEmitter<any>();

  /** When a specific field is changed. Format is {fieldName: 'myTextField', value: 'My New Value'} */
  @Output() formFieldDataChange = new EventEmitter<any>();

  /** Whenever the form validity state is changed */
  @Output() formValidityChange = new EventEmitter<any>();

  form: FormGroup;
  valid = true;

  formChangesSubscription: Subscription;
  fieldsSubscription = {};

  constructor(private fb: AfFormBuilderService) {
    this.form = this.fb.buildEmptyForm();
  }

  ngOnInit() {
    this.buildForm();
    this.valid = this.form.valid;
    this.formValidityChange.emit(this.valid);
  }

  /*
   * TODO: need to use ngDoCheck() to ensure that modifications made to
   * "this.formDefinition" are caught (e.g. a field was removed from the layout)
   */
  ngOnChanges(changes) {
    this.buildForm();
    this.valid = this.form.valid;
  }

  buildForm(): void {
    this.fb.buildForm(this.form, this.formData, this.formDefinition);
    for (const field in this.form.controls) {
      if (this.form.controls.hasOwnProperty(field) && !this.fieldsSubscription[field]) {
        this.fieldsSubscription[field] = this.form.controls[field].valueChanges.subscribe(newValue => {
          this.formFieldDataChange.emit({ fieldName: field, value: newValue });
        });
      }
    }

    if (!this.formChangesSubscription) {
      this.formChangesSubscription = this.form.valueChanges.subscribe(data => {
        if (this.valid !== this.form.valid) {
          this.valid = this.form.valid;
          this.formValidityChange.emit(this.form.valid);
        }
        this.formDataChange.emit(data);
      });
    }
  }

  getField(fieldName: string): AfField {
    return this.formDefinition.fields.find(f => f.name === fieldName);
  }

  getColumnSize(row: string[]) {
    let size = 0;
    row.forEach(fieldName => {
      if (this.isFieldVisible(fieldName)) {
        size++;
      }
    });
    return 12 / size; // "12" because that's the way the bootstrap grid system works
  }

  isFieldVisible(fieldName: string) {
    return this.fb.isFieldIncludedInLayout(fieldName, this.formDefinition.layout);
  }
}
