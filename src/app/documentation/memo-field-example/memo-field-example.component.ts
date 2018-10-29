import { Component } from '@angular/core';

@Component({
  selector: 'app-memo-field-example',
  templateUrl: './memo-field-example.component.html',
  styleUrls: ['./memo-field-example.component.css']
})
export class MemoFieldExampleComponent {
  myFormData = {
    memoField: 'Some really long text could go right here in this spot'
  };

  myFormDefinition = {
    layout: [['memoField']],
    fields: [
      {
        name: 'memoField',
        fieldType: 'Memo',
        label: 'Memo Field Label'
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
