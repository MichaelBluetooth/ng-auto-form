import { AfFormBuilderService } from './af-form-builder.service';
import { AfFieldType, AfField, AfFieldValidationName } from './../../models/af-field.model';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { NgAutoFormModule } from './../../ng-auto-form.module';
import { AfFormComponent } from './af-form.component';
import { Component } from '@angular/core';
import { AfValidationService } from '../../validators/af-validation.service';

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

  describe('Invalid Fields', () => {
    it('should not be considered when the field value is invalid but hidden', () => {
      component.formData = {
        validField: 'NotHidden',
        hiddenField: ''
      };
      component.formDefinition = {
        layout: [['validField', 'hiddenField']],
        fields: [
          {
            name: 'validField',
            label: 'Valid Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false
          },
          {
            name: 'hiddenField',
            label: 'Hidden Field',
            fieldType: AfFieldType.Text,
            validations: [
              {
                name: AfFieldValidationName.Required
              }],
            visibility: [{
              fieldName: 'validField',
              values: ['Hidden']
            }],
            tooltip: '',
            readOnly: false,
            focus: false
          }
        ]
      };

      fixture.detectChanges();
      expect(component['form'].valid).toBe(true);
    });
  });

  describe('changing a form value', () => {
    it('should emit changes to the form data', () => {
      spyOn(component.formDataChange, 'emit');
      spyOn(component.formFieldDataChange, 'emit');

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
            focus: false
          }
        ]
      };
      fixture.detectChanges();
      const textInput = fixture.debugElement.nativeElement.querySelector('input');
      textInput.value = 'New Value';
      textInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.formDataChange.emit).toHaveBeenCalledWith({ myField: 'New Value' });
      expect(component.formFieldDataChange.emit).toHaveBeenCalledWith({ fieldName: 'myField', value: 'New Value' });
    });

    it('should update and hide a field when a value matches the visibility settings', () => {
      component.formData = {
        validField: 'NotHidden',
        hiddenField: ''
      };
      component.formDefinition = {
        layout: [['validField', 'hiddenField']],
        fields: [
          {
            name: 'validField',
            label: 'Valid Field',
            fieldType: AfFieldType.Text,
            tooltip: '',
            readOnly: false,
            focus: false
          },
          {
            name: 'hiddenField',
            label: 'Hidden Field',
            fieldType: AfFieldType.Text,
            validations: [
              {
                name: AfFieldValidationName.Required
              }],
            visibility: [{
              fieldName: 'validField',
              values: ['NotHidden']
            }],
            tooltip: '',
            readOnly: false,
            focus: false
          }
        ]
      };
      fixture.detectChanges();
      const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
      expect(inputs.length).toBe(2);
      inputs[0].value = 'Hidden';
      inputs[0].dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelectorAll('input').length).toBe(1);
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
