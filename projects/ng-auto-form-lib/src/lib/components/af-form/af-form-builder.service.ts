import { AfField } from './../../models/af-field.model';
import { AfValidationService } from './../../validators/af-validation.service';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AfForm } from '../../models/af-form.model';

@Injectable()
export class AfFormBuilderService {
    constructor(private formBuilder: FormBuilder, private validationService: AfValidationService) {
    }

    buildEmptyForm(): FormGroup {
        return this.formBuilder.group({});
    }

    buildForm(form: FormGroup, formData: any, formDefinition: AfForm): void {
        formDefinition.fields.forEach(afField => {
            if (this.isFieldIncludedInForm(afField, formDefinition.layout, formData)) {
                const formValue = formData ? (formData.hasOwnProperty(afField.name) ? formData[afField.name] : null) : null;
                if (form.controls[afField.name]) {
                    form.controls[afField.name].setValidators(this.validationService.getValidationsForControl(afField.validations));
                    form.controls[afField.name].setValue(formValue, { emitEvent: false, onlySelf: true });
                    form.controls[afField.name].updateValueAndValidity({ emitEvent: false, onlySelf: true });
                } else {
                    form.addControl(afField.name, new FormControl(formValue, this.validationService.getValidationsForControl(afField.validations)));
                }
            } else if (form.controls[afField.name]) {
                form.removeControl(afField.name);
            }
        });
    }

    isFieldIncludedInForm(field: AfField, layout: string[][], formData: any): boolean {
        //return this.isFieldVisible(field, formData) && this.isFieldIncludedInLayout(field.name, layout);
        return true;
    }

    isFieldIncludedInLayout(fieldName: string, layout: string[][]): boolean {
        let isFieldInLayout = false;
        if (layout) {
            layout.forEach(row => {
                row.forEach(field => {
                    if (field === fieldName) {
                        isFieldInLayout = true;
                    }
                });
            });
        }
        return isFieldInLayout;
    }

    isFieldVisible(field: AfField, formData: any): boolean {
        let isVisible = !field.visibility || field.visibility.length === 0;
        if (field && field.visibility) {
            field.visibility.forEach(vis => {
                let formValue = formData;
                vis.fieldName.split('.').forEach(subField => {
                    formValue = formValue[subField] ? formValue[subField] : null;
                });
                // tslint:disable-next-line:triple-equals
                if (vis.values.find(v => v == formValue)) { // INTENTIONALLY DOING A LOOSE COMPARISON SO WE CAN SUPPORT NUMERIC VS. STRING VALUES
                    isVisible = true;
                }
            });
        }
        return isVisible;
    }
}
