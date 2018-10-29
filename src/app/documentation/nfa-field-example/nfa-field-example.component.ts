import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfa-field-example',
  templateUrl: './nfa-field-example.component.html',
  styleUrls: ['./nfa-field-example.component.css']
})
export class NfaFieldExampleComponent {

  myFormData = {
    nfpaField: {
      flamibility: 1,
      health: 2,
      instability: 3,
      special: 'ACID'
    }
  };

  myFormDefinition = {
    layout: [['nfpaField']],
    fields: [
      {
        name: 'nfpaField',
        fieldType: 'NFPA',
        label: 'NFPA Label'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

}
