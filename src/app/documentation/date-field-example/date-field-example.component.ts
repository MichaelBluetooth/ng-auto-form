import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-field-example',
  templateUrl: './date-field-example.component.html',
  styleUrls: ['./date-field-example.component.css']
})
export class DateFieldExampleComponent {
  myFormData = {
    dateField: new Date('11/20/2015')
  };

  myFormDefinition = {
    layout: [['dateField']],
    fields: [
      {
        name: 'dateField',
        fieldType: 'Date',
        label: 'Date Field Label',
        dateMask: 'MM-DD-YYYY'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
