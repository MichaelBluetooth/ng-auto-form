import { AfFieldType, AfFieldValidationName } from './../../models/af-field.model';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgAutoFormModule } from './../../ng-auto-form.module';
import { AfFormComponent } from './af-form.component';

describe('AfFormComponent', () => {
  let component: AfFormComponent;
  let fixture: ComponentFixture<AfFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        NgAutoFormModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfFormComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with a form', () => {
    expect(component.form).toBeDefined();
  });

  describe('form validity', () => {
    it('should emit true when the form is initially valid', () => {
      spyOn(component.formValidityChange, 'emit');

      component.formData = {
        myField: 'valid value',
      };
      component.formDefinition = {
        layout: [['myField']],
        fields: [
          {
            name: 'myField',
            label: 'Test Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false,
            validations: [{ name: AfFieldValidationName.Required }]
          }
        ]
      };
      fixture.detectChanges();
      expect(component.formValidityChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit false when the form is initially valid', () => {
      spyOn(component.formValidityChange, 'emit');

      component.formData = {
        myField: '',
      };
      component.formDefinition = {
        layout: [['myField']],
        fields: [
          {
            name: 'myField',
            label: 'Test Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false,
            validations: [{ name: AfFieldValidationName.Required }]
          }
        ]
      };
      fixture.detectChanges();
      expect(component.formValidityChange.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('changing a form value', () => {
    it('should emit changes to the form data and preserve and data not included in the layout', () => {
      spyOn(component.formDataChange, 'emit');
      spyOn(component.formFieldDataChange, 'emit');

      component.formData = {
        myField: '',
        myFieldThatIsNotInTheLayout: 'test_value',
      };
      component.formDefinition = {
        layout: [['myField']],
        fields: [
          {
            name: 'myField',
            label: 'Test Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false
          },
          {
            name: 'myFieldThatIsNotInTheLayout',
            label: 'Other Test Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false
          }
        ]
      };
      fixture.detectChanges();
      const textInput = fixture.debugElement.nativeElement.querySelector('input');
      textInput.value = 'New Value';
      textInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.formDataChange.emit).toHaveBeenCalledWith({ myField: 'New Value', myFieldThatIsNotInTheLayout: 'test_value' });
      expect(component.formFieldDataChange.emit).toHaveBeenCalledWith({ fieldName: 'myField', value: 'New Value' });
    });

    it('should emit an event when the form validity state changes', () => {
      spyOn(component.formValidityChange, 'emit');
      component.formData = {
        validField: '',
      };
      component.formDefinition = {
        layout: [['validField']],
        fields: [
          {
            name: 'validField',
            label: 'Valid Field',
            fieldType: AfFieldType.Text,
            validations: [{ name: AfFieldValidationName.Required }],
            tooltip: '',
            readOnly: false,
            focus: false
          }
        ]
      };
      fixture.detectChanges();
      expect(component['valid']).toBe(false);

      const input = fixture.debugElement.nativeElement.querySelector('input');
      input.value = 'Value here!';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component['valid']).toBe(true);
      expect(component.formValidityChange.emit).toHaveBeenCalledWith(true);

      input.value = '';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component['valid']).toBe(false);
      expect(component.formValidityChange.emit).toHaveBeenCalledWith(false);
    });
  });
});
