import { Component } from '@angular/core';

@Component({
  selector: 'app-relationship-field-example',
  templateUrl: './relationship-field-example.component.html',
  styleUrls: ['./relationship-field-example.component.css']
})
export class RelationshipFieldExampleComponent {
  myFormData = {
    relationshipField: null
  };

  myFormDefinition = {
    layout: [['relationshipField']],
    fields: [
      {
        name: 'relationshipField',
        fieldType: 'Relationship',
        label: 'Relationship Label',
        displayNameField: 'name',
        relationshipServiceConfig: {
          pageSize: 5,
          filterField: 'name',
          apiUrl: 'https://statsapi.web.nhl.com/api/v1/teams'
        }
      }
    ]
  };

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }
}
