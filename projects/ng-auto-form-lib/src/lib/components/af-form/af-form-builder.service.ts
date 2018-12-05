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
            const formValue = formData ? (formData.hasOwnProperty(afField.name) ? formData[afField.name] : null) : null;
            if (form.controls[afField.name]) {
                form.controls[afField.name].setValidators(this.validationService.getValidationsForControl(afField.validations));
                form.controls[afField.name].setValue(formValue, { emitEvent: false, onlySelf: true });
                form.controls[afField.name].updateValueAndValidity({ emitEvent: false, onlySelf: true });
            } else {
                form.addControl(afField.name, new FormControl(formValue, this.validationService.getValidationsForControl(afField.validations)));
            }
        });
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
}
