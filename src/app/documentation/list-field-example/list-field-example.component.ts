import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-field-example',
  templateUrl: './list-field-example.component.html',
  styleUrls: ['./list-field-example.component.css']
})
export class ListFieldExampleComponent {

  myFormData = {
    listField: 'Option 1'
  };

  myFormDefinition = {
    layout: [['listField']],
    fields: [
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Label',
        listOptions: ['Option 1', 'Option 2']
      }
    ]
  };

  myFormDataWithNameAndIds = {
    listField: 2
  };

  myFormDefinitionWithNameAndIds = {
    layout: [['listField']],
    fields: [
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Label',
        listOptions: [{ id: 1, name: 'Option 1' }, { id: 2, name: 'Option 2' }]
      }
    ]
  };

  myFormDataWithCustomFields = {
    listField: 2
  };

  myFormDefinitionWithCustomFields = {
    layout: [['listField']],
    fields: [
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Label',
        displayFieldName: 'nodeId',
        valueFieldName: 'nodeName',
        listOptions: [{ nodeId: 1, nodeName: 'Option 1' }, { nodeId: 2, nodeName: 'Option 2' }]
      }
    ]
  };

  myFormDataWithRequiredFields = {
    listField: ''
  };

  myFormDefinitionWithRequiredFields = {
    layout: [['listField']],
    fields: [
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Label',
        listOptions: ['', 'Option 1', 'Option 2'],
        validations: [{ name: 'Required' }]
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

  printFormDataWithNameAndIds(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormDataWithNameAndIds);
  }

  printFormDataWithCustomFields(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormDataWithCustomFields);
  }

  printFormDataWithRequiredFields(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormDataWithRequiredFields);
  }
}
