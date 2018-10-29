import { Component } from '@angular/core';

@Component({
  selector: 'app-casno-field-example',
  templateUrl: './casno-field-example.component.html',
  styleUrls: ['./casno-field-example.component.css']
})
export class CasnoFieldExampleComponent {

  myFormData = {
    casNoField: '1234-56-2'
  };

  myFormDefinition = {
    layout: [['casNoField']],
    fields: [
      {
        name: 'casNoField',
        fieldType: 'CASNumber',
        label: 'CAS Number Field Label'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
