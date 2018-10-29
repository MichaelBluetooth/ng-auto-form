import { AfFieldValidation, AfFieldValidationName } from './../models/af-field.model';
import { AfValidationService } from './af-validation.service';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { async, TestBed, inject } from '@angular/core/testing';

describe('AfValidationService', () => {
    let service: AfValidationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [AfValidationService]
        }).compileComponents();
    }));

    beforeEach(inject([AfValidationService], (injectedService: AfValidationService) => {
        service = injectedService;
    }));

    describe('Getting validations for a form control', () => {
        it('should add the required validator', () => {
            expect(service.getValidationsForControl([new AfFieldValidation(AfFieldValidationName.Required)])).toContain(Validators.required);
        });

        it('should add the email validator', () => {
            expect(service.getValidationsForControl([new AfFieldValidation(AfFieldValidationName.Email)])).toContain(Validators.email);
        });

        //TODO: how to validate the collection contains validators that take a value?
    });

    describe('Getting error messages', () => {
        it('should handle required', () => {
            expect(service.getValidatorErrorMessage('required')).toBe('Required');
        });
        it('should handle MinLength', () => {
            expect(service.getValidatorErrorMessage('minlength', { requiredLength: 5 })).toBe('Minimum length 5');
        });
        it('should handle MaxLength', () => {
            expect(service.getValidatorErrorMessage('maxlength', { requiredLength: 5 })).toBe('Maximum length 5');
        });
        it('should handle Pattern', () => {
            expect(service.getValidatorErrorMessage('pattern', { requiredPattern: '\\d*' })).toBe('Value does not match pattern \\d*');
        });
        it('should handle validateNumber', () => {
            expect(service.getValidatorErrorMessage('validateNumber')).toBe('Value must be a number');
        });
        it('should handle Min', () => {
            expect(service.getValidatorErrorMessage('min', { min: 45 })).toBe('Min value 45');
        });
        it('should handle Max', () => {
            expect(service.getValidatorErrorMessage('max', { max: 125 })).toBe('Max value 125');
        });
        it('should handle GreaterThan', () => {
            expect(service.getValidatorErrorMessage('greaterthan', 50)).toBe('Value must be greater than 50');
        });
        it('should handle Email', () => {
            expect(service.getValidatorErrorMessage('email')).toBe('Value must be a valid email');
        });
        it('should handle LessThan', () => {
            expect(service.getValidatorErrorMessage('lessthan', 50)).toBe('Value must be less than 50');
        });
        it('should return null when given an unrecognized validation message', () => {
            expect(service.getValidatorErrorMessage('GARBAGETHING')).toBe(null);
        });
    });

    describe('Validation of numbers', () => {
        const control: FormControl = new FormControl();

        it('should validate numeric values', () => {
            control.setValue(22);
            expect(service.isNumber(control)).toEqual(null);
        });

        it('should validate negative numeric values', () => {
            control.setValue(-3212);
            expect(service.isNumber(control)).toEqual(null);
        });

        it('should validate decimal values', () => {
            control.setValue(345235.232);
            expect(service.isNumber(control)).toEqual(null);
        });

        it('should validate numeric string values', () => {
            control.setValue('-23.12');
            expect(service.isNumber(control)).toEqual(null);
        });

        it('should invalidate strings', () => {
            control.setValue('I am a string');
            expect(service.isNumber(control)).toEqual({
                validateNumber: {
                    valid: false
                }
            });
        });

        it('should invalidate null', () => {
            control.setValue(null);
            expect(service.isNumber(control)).toEqual({
                validateNumber: {
                    valid: false
                }
            });
        });

        it('should invalidate undefined', () => {
            control.setValue(undefined);
            expect(service.isNumber(control)).toEqual({
                validateNumber: {
                    valid: false
                }
            });
        });
    });

    describe('Greater Than', () => {
        const control: FormControl = new FormControl();
        let greaterThan: ValidatorFn;

        beforeEach(() => {
            greaterThan = service.greaterThan(50);
        });

        it('should invalidate numbers less than the given value', () => {
            control.setValue(10);
            expect(greaterThan(control)).toEqual({ greaterThan: 50 });
        });

        it('should invalidate numbers equal to the given value', () => {
            control.setValue(50);
            expect(greaterThan(control)).toEqual({ greaterThan: 50 });
        });

        it('should validate numbers greater than the given value', () => {
            control.setValue(100);
            expect(greaterThan(control)).toEqual(null);
        });

        it('should validate null', () => {
            control.setValue(null);
            expect(greaterThan(control)).toEqual(null);
        });

        it('should validate undefined', () => {
            control.setValue(null);
            expect(greaterThan(control)).toEqual(null);
        });
    });

    describe('Less Than', () => {
        const control: FormControl = new FormControl();
        let lessThan: ValidatorFn;

        beforeEach(() => {
            lessThan = service.lessThan(50);
        });

        it('should validate numbers less than the given value', () => {
            control.setValue(10);
            expect(lessThan(control)).toEqual(null);
        });

        it('should invalidate numbers equal to the given value', () => {
            control.setValue(50);
            expect(lessThan(control)).toEqual({lessThan: 50});
        });

        it('should invalidate numbers greater than the given value', () => {
            control.setValue(100);
            expect(lessThan(control)).toEqual({ lessThan: 50 });
        });

        it('should validate null', () => {
            control.setValue(null);
            expect(lessThan(control)).toEqual(null);
        });

        it('should validate undefined', () => {
            control.setValue(null);
            expect(lessThan(control)).toEqual(null);
        });
    });
});
