import { AfFieldValidation, AfFieldValidationName } from './../models/af-field.model';
import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class AfValidationService {

    getValidationsForControl(validations: AfFieldValidation[]): any[] {
        const formValidations = [];

        if (validations) {
            validations.forEach((validation: AfFieldValidation) => {
                switch (validation.name) {
                    case AfFieldValidationName.Required:
                        formValidations.push(Validators.required);
                        break;
                    case AfFieldValidationName.MinLength:
                        formValidations.push(Validators.minLength(validation.value));
                        break;
                    case AfFieldValidationName.MaxLength:
                        formValidations.push(Validators.maxLength(validation.value));
                        break;
                    case AfFieldValidationName.Pattern:
                        formValidations.push(Validators.pattern(validation.value));
                        break;
                    case AfFieldValidationName.Email:
                        formValidations.push(Validators.email);
                        break;
                    case AfFieldValidationName.Min:
                        formValidations.push(Validators.min(validation.value));
                        break;
                    case AfFieldValidationName.Max:
                        formValidations.push(Validators.max(validation.value));
                        break;
                    case AfFieldValidationName.GreaterThan:
                        formValidations.push(this.greaterThan(validation.value));
                        break;
                    case AfFieldValidationName.LessThan:
                        formValidations.push(this.lessThan(validation.value));
                        break;
                }
            });
        }

        return formValidations;
    }

    getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
        switch (validatorName.toLowerCase()) {
            case 'required':
                return 'Required';
            case 'validatenumber':
                return 'Value must be a number';
            case 'minlength':
                return `Minimum length ${validatorValue.requiredLength}`;
            case 'maxlength':
                return `Maximum length ${validatorValue.requiredLength}`;
            case 'pattern':
                return `Value does not match pattern ${validatorValue.requiredPattern}`;
            case 'email':
                return 'Value must be a valid email';
            case 'min':
                return `Min value ${validatorValue.min}`;
            case 'max':
                return `Max value ${validatorValue.max}`;
            case 'greaterthan':
                return `Value must be greater than ${validatorValue}`;
            case 'lessthan':
                return `Value must be less than ${validatorValue}`;
            default:
                return null;
        }
    }

    isNumber(c: AbstractControl): any {
        return (c && isFinite(Number(String(c.value).trim() || NaN))) ? null : {
            validateNumber: {
                valid: false
            }
        };
    }

    greaterThan(testValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return testValue >= control.value && (control.value !== null && control.value !== undefined) ? { greaterThan: testValue } : null;
        };
    }

    lessThan(testValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return testValue <= control.value && (control.value !== null && control.value !== undefined) ? { lessThan: testValue } : null;
        };
    }
}
