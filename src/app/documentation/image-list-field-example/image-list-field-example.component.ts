import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-list-field-example',
  templateUrl: './image-list-field-example.component.html',
  styleUrls: ['./image-list-field-example.component.css']
})
export class ImageListFieldExampleComponent {

  myFormData = {
    imageListField: 'value1'
  };

  myFormDefinition = {
    layout: [['imageListField']],
    fields: [
      {
        name: 'imageListField',
        fieldType: 'ImageList',
        label: 'Image List (Single Select)',
        imageOptions: [
          { value: 'value1', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value2', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value3', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value4', imageUrl: 'https://via.placeholder.com/150x150' }
        ]
      }
    ]
  };

  myFormDataMultiSelect = {
    imageListField: ['value2', 'value3']
  };

  myFormDefinitionMultiSelect = {
    layout: [['imageListField']],
    fields: [
      {
        name: 'imageListField',
        fieldType: 'ImageList',
        label: 'Image List (Multi-Select)',
        isMultiple: true,
        imageOptions: [
          { value: 'value1', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value2', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value3', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value4', imageUrl: 'https://via.placeholder.com/150x150' }
        ]
      }
    ]
  };

  myFormDataValidation = {
    imageListField: ''
  };

  myFormDefinitionValidation = {
    layout: [['imageListField']],
    fields: [
      {
        name: 'imageListField',
        fieldType: 'ImageList',
        label: 'Image List (With Validation)',
        validations: [{name: 'Required'}],
        imageOptions: [
          { value: 'value1', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value2', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value3', imageUrl: 'https://via.placeholder.com/150x150' },
          { value: 'value4', imageUrl: 'https://via.placeholder.com/150x150' }
        ]
      }
    ]
  };

  printFormData() {
    console.log(this.myFormData);
    alert('Open the console to see the form data!');
  }

  printFormDataMultiSelect() {
    console.log(this.myFormDataMultiSelect);
    alert('Open the console to see the form data!');
  }
}
