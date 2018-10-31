import { Component } from '@angular/core';

@Component({
  selector: 'app-multi-list-field-example',
  templateUrl: './multi-list-field-example.component.html',
  styleUrls: ['./multi-list-field-example.component.css']
})
export class MultiListFieldExampleComponent {

  myFormData = {
    listField1: ['Option 1', 'Option 2'],
    listField2: ['Option 1', 'Option 2'],
    listField3: ['Option 1', 'Option 2']
  };

  myFormDefinition = {
    layout: [['listField1'], ['listField2'], ['listField3']],
    fields: [
      {
        name: 'listField1',
        fieldType: 'MultiList',
        label: 'Multi List With String Options',
        listOptions: ['Option 1', 'Option 2', 'Option 3']
      },
      {
        name: 'listField2',
        fieldType: 'MultiList',
        label: 'Multi List With Id/Name Options',
        listOptions: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' }
        ]
      },
      {
        name: 'listField3',
        fieldType: 'MultiList',
        label: 'Multi List With Custom Object Options',
        displayFieldName: 'nodeId',
        valueFieldName: 'nodeName',
        listOptions: [
          { nodeId: 1, nodeName: 'Option 1' },
          { nodeId: 2, nodeName: 'Option 2' },
          { nodeId: 3, nodeName: 'Option 3' }
        ]
      },
    ]
  };

  printFormData() {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
