import { AfValidationService } from './../../validators/af-validation.service';
import { AfFieldValidationName } from './../../models/af-field.model';
import { AfFormBuilderService } from './af-form-builder.service';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, fakeAsync, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { AfForm } from './../../models/af-form.model';
import { AfTextField, AfFieldValidation } from '../../models/af-field.model';

describe('AfFormBuilderService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
            providers: [AfFormBuilderService, AfValidationService]
        }).compileComponents();
    }));

    beforeEach(inject([AfFormBuilderService, FormBuilder], (injectedService: AfFormBuilderService, injectedFormBuilder: FormBuilder) => {
        this.service = injectedService;
    }));

    describe('detecting fields in the layout', () => {
        it('should be able to detect which fields are not included in the layout', () => {
            expect(this.service.isFieldIncludedInLayout('dummyField', [['field1', 'field2'], ['field3', 'field4']])).toBe(false);
        });

        it('should be able to detect which fields are are included in the layout', () => {
            expect(this.service.isFieldIncludedInLayout('field3', [['field1', 'field2'], ['field3', 'field4']])).toBe(true);
        });
    });

    describe('detection of conditionally hidden fields', () => {
        it('should return false when the given fields visibility settings match another fields value', () => {
            expect(this.service.isFieldVisible(
                {
                    name: 'conditionalField',
                    visibility: [
                        { fieldName: 'parentField', values: ['triggerValue'] }
                    ]
                },
                {
                    conditionalField: '',
                    parentField: 'triggerValue'
                })).toBe(true);
        });

        it('should return false when the given fields visibility settings does not match another fields value', () => {
            expect(this.service.isFieldVisible(
                {
                    name: 'conditionalField',
                    visibility: [
                        { fieldName: 'parentField', values: ['triggerValue'] }
                    ]
                },
                {
                    conditionalField: '',
                    parentField: 'NOT triggerValue'
                })).toBe(false);
        });

        it('should return false when the given fields visibility settings match another fields value specified using dot notation', () => {
            expect(this.service.isFieldVisible(
                {
                    name: 'conditionalField',
                    visibility: [
                        { fieldName: 'parentField.someSubField', values: ['triggerValue'] }
                    ]
                },
                {
                    conditionalField: '',
                    parentField: {
                        id: 123123,
                        someSubField: 'triggerValue'
                    }
                })).toBe(true);
        });

        it('should return false when the given fields visibility settings does not match another fields value specified using dot notation', () => {
            expect(this.service.isFieldVisible(
                {
                    name: 'conditionalField',
                    visibility: [
                        { fieldName: 'parentField.someSubSubfield', values: ['triggerValue'] }
                    ]
                },
                {
                    conditionalField: '',
                    parentField: {
                        id: 123123,
                        somSubField: 'NOT triggerValue'
                    }
                })).toBe(false);
        });
    });

    describe('determination of which fields are included in the form', () => {
        it('should exclude fields that are not visible', () => {
            spyOn(this.service, 'isFieldVisible').and.returnValue(false);
            spyOn(this.service, 'isFieldIncludedInLayout').and.returnValue(true);
            expect(this.service.isFieldIncludedInForm({ name: 'dummy' }, [['dummy']], { dummy: 'value' })).toBe(false);
        });

        it('should exclude fields that are not in the layout', () => {
            spyOn(this.service, 'isFieldVisible').and.returnValue(true);
            spyOn(this.service, 'isFieldIncludedInLayout').and.returnValue(false);
            expect(this.service.isFieldIncludedInForm({ name: 'dummy' }, [['dummy']], { dummy: 'value' })).toBe(false);
        });

        it('should only include fields that are in the layout and visible', () => {
            spyOn(this.service, 'isFieldVisible').and.returnValue(true);
            spyOn(this.service, 'isFieldIncludedInLayout').and.returnValue(true);
            expect(this.service.isFieldIncludedInForm({ name: 'dummy' }, [['dummy']], { dummy: 'value' })).toBe(true);
        });
    });

    describe('building a form', () => {
        it('it should build a form by updating existing controls, adding new ones and removing ones no longer present in the layout',
            inject([FormBuilder], (injectedFormBuilder: FormBuilder) => {
                const preExistingForm = injectedFormBuilder.group({});
                preExistingForm.addControl('myFirstTextField', new FormControl('textValue1'));
                preExistingForm.addControl('mySecondTextField', new FormControl('textValue2'));

                this.myForm = new AfForm();
                this.myForm.layout = [['myFirstTextField', 'myThirdTextField']];
                this.myForm.fields.push(new AfTextField('myFirstTextField'));
                this.myForm.fields.push(new AfTextField('mySecondTextField'));
                this.myForm.fields.push(new AfTextField('myThirdTextField'));

                this.myData = {
                    mySecondTextField: 'textValue2',
                    myThirdTextField: 'textValue3'
                };

                this.service.buildForm(preExistingForm, this.myData, this.myForm);
                expect(Object.keys(preExistingForm.controls).length).toBe(2);
                expect(preExistingForm.controls['myFirstTextField']).toBeDefined();
                expect(preExistingForm.controls['myFirstTextField'].value).toBe(null);
                expect(preExistingForm.controls['mySecondTextField']).not.toBeDefined();
                expect(preExistingForm.controls['myThirdTextField']).toBeDefined();
                expect(preExistingForm.controls['myThirdTextField'].value).toBe(this.myData.myThirdTextField);
            }));
    });
});
