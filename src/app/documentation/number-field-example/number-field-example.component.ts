import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-field-example',
  templateUrl: './number-field-example.component.html',
  styleUrls: ['./number-field-example.component.css']
})
export class NumberFieldExampleComponent {
  myFormData = {
    numberField: 42
  };

  myFormDefinition = {
    layout: [['numberField']],
    fields: [
      {
        name: 'numberField',
        fieldType: 'Number',
        label: 'Number Field Label'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

}
