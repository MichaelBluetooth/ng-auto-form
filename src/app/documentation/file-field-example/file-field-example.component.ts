import { Component } from '@angular/core';

@Component({
  selector: 'app-file-field-example',
  templateUrl: './file-field-example.component.html',
  styleUrls: ['./file-field-example.component.css']
})
export class FileFieldExampleComponent {

  myFormData = {
    fileField: null
  };

  myFormDefinition = {
    layout: [['fileField']],
    fields: [
      {
        name: 'fileField',
        fieldType: 'File',
        label: 'Field Field Label',
        acceptedfileTypes: '.gif, .jpg, .png'
      }
    ]
  };

  printFormData() {
    if (this.myFormData.fileField) {
      console.log(this.myFormData);
      alert(`Check the console for details!\nFile name: ${this.myFormData.fileField[0].name},\nFile type: ${this.myFormData.fileField[0].type}\nFile size: ${this.myFormData.fileField[0].size}`);
    } else {
      alert("No file uploaded");
    }
  }
}
