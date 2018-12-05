import { AfValidationService } from './../../validators/af-validation.service';
import { AfFormBuilderService } from './af-form-builder.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { async, TestBed, inject } from '@angular/core/testing';
import { AfForm } from './../../models/af-form.model';
import { AfTextField } from '../../models/af-field.model';

describe('AfFormBuilderService', () => {
    let service: AfFormBuilderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
            providers: [AfFormBuilderService, AfValidationService]
        }).compileComponents();
    }));

    beforeEach(inject([AfFormBuilderService, FormBuilder], (injectedService: AfFormBuilderService, injectedFormBuilder: FormBuilder) => {
        service = injectedService;
    }));

    describe('detecting fields in the layout', () => {
        it('should be able to detect which fields are not included in the layout', () => {
            expect(service.isFieldIncludedInLayout('dummyField', [['field1', 'field2'], ['field3', 'field4']])).toBe(false);
        });

        it('should be able to detect which fields are are included in the layout', () => {
            expect(service.isFieldIncludedInLayout('field3', [['field1', 'field2'], ['field3', 'field4']])).toBe(true);
        });
    });

    describe('building a form', () => {
        it('it should build a form by updating existing controls and adding new ones that did not exist before',
            inject([FormBuilder], (injectedFormBuilder: FormBuilder) => {
                const preExistingForm = injectedFormBuilder.group({});
                preExistingForm.addControl('myFirstTextField', new FormControl('textValue1'));
                preExistingForm.addControl('mySecondTextField', new FormControl('textValue2'));

                const myForm = new AfForm();
                myForm.layout = [['myFirstTextField', 'myThirdTextField']];
                myForm.fields.push(new AfTextField('myFirstTextField'));
                myForm.fields.push(new AfTextField('mySecondTextField'));
                myForm.fields.push(new AfTextField('myThirdTextField'));

                const myData = {
                    mySecondTextField: 'textValue2',
                    myThirdTextField: 'textValue3'
                };

                service.buildForm(preExistingForm, myData, myForm);
                expect(Object.keys(preExistingForm.controls).length).toBe(3);
                expect(preExistingForm.controls['myFirstTextField']).toBeDefined();
                expect(preExistingForm.controls['myFirstTextField'].value).toBe(null);
                expect(preExistingForm.controls['mySecondTextField']).toBeDefined();
                expect(preExistingForm.controls['mySecondTextField'].value).toBe(myData.mySecondTextField);
                expect(preExistingForm.controls['myThirdTextField']).toBeDefined();
                expect(preExistingForm.controls['myThirdTextField'].value).toBe(myData.myThirdTextField);
            }));
    });
});
