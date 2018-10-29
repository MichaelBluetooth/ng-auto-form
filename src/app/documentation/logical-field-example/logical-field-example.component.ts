import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logical-field-example',
  templateUrl: './logical-field-example.component.html',
  styleUrls: ['./logical-field-example.component.css']
})
export class LogicalFieldExampleComponent {
  myFormData = {
    logicalField: true
  };

  myFormDefinition = {
    layout: [['logicalField']],
    fields: [
      {
        name: 'logicalField',
        fieldType: 'Logical',
        label: 'Logical Field Label'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
