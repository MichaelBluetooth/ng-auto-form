import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-field-example',
  templateUrl: './text-field-example.component.html',
  styleUrls: ['./text-field-example.component.css']
})
export class TextFieldExampleComponent {
  myFormData = {
    textField: 'Some text here'
  };

  myFormDefinition = {
    layout: [['textField']],
    fields: [
      {
        name: 'textField',
        fieldType: 'Text',
        label: 'Text Field Label'
      }
    ]
  };

  myValidatedFormData = {
    requiredField: '',
    minLengthField: 'too short',
    maxLengthField: 'way too long',
    patternField: 'value does not match pattern',
    emailField: 'email at place dot com',
    mixedValidationsField: ''
  };

  myValidatedFormDefinition = {
    layout: [
      ['requiredField', 'minLengthField', 'maxLengthField'],
      ['patternField', 'emailField'],
      ['mixedValidationsField']
    ],
    fields: [
      {
        name: 'requiredField',
        fieldType: 'Text',
        label: 'Required Field',
        validations: [{ name: 'Required' }]
      },
      {
        name: 'minLengthField',
        fieldType: 'Text',
        label: 'Min length Field',
        validations: [{ name: 'MinLength', value: 15 }]
      },
      {
        name: 'maxLengthField',
        fieldType: 'Text',
        label: 'Max Length Field',
        validations: [{ name: 'MaxLength', value: 5 }]
      },
      {
        name: 'patternField',
        fieldType: 'Text',
        label: 'Pattern Field',
        validations: [{ name: 'Pattern', value: '\\d{3}-\\d{3}' }]
      },
      {
        name: 'emailField',
        fieldType: 'Text',
        label: 'Email Field',
        validations: [{ name: 'Email' }]
      },
      {
        name: 'mixedValidationsField',
        fieldType: 'Text',
        label: 'Mixed Validations Field',
        validations: [{ name: 'Required' }, { name: 'MaxLength', value: 12 }, { name: 'MinLength', value: 3 }]
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

  printValidatedFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myValidatedFormData);
  }
}
