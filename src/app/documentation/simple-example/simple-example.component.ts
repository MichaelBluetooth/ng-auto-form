import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-example',
  templateUrl: './simple-example.component.html',
  styleUrls: ['./simple-example.component.css']
})
export class SimpleExampleComponent {

  myFormData = {
    textField: 'This is some text',
    numberField: 42,
    listField: 'Orange'
  };

  myFormDefinition = {
    layout: [['textField'], ['numberField', 'listField']],
    fields: [
      {
        name: 'textField',
        fieldType: 'Text',
        label: 'Text Field Label'
      },
      {
        name: 'numberField',
        fieldType: 'Number',
        label: 'Number Field Label'
      },
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Field Label',
        listOptions: ['Banana', 'Orange', 'Grape', 'Apple']
      }
    ]
  };

  onFormFieldChange(formChangeData) {
    console.log('onFormFieldChange() called!');
    console.log(formChangeData);
  }

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

}
