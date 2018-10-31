# NgAutoForm

An Angular component library for generating forms based on metadata definitions.

This library leans heavily on bootstrap (for styles), ngx-bootstrap (mostly for their date picker) and font-awesome (for icons).

You can head over to [the official documentation page](https://ng-auto-form.herokuapp.com) to see more example usage.

## Getting Started

1. Install NgAutoForm

```
npm install ng-auto-form
```

2. Install peer dependencies.

```
npm install bootstrap ngx-bootstrap font-awesome.
```

3. Update the "styles" section in angular.json for your project to include bootstrap and font-awesome.

```
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "node_modules/font-awesome/css/font-awesome.css"
]
```

4. Import NgAutoForm in your app module.

```javascript
import { NgAutoFormModule } from 'ng-auto-form';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgAutoFormModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

5. Use it in a component.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'simple-example',
  template: `
    <af-form [formDefinition]="myFormDefinition" [(formData)]="myFormData" (formFieldDataChange)="onFormFieldChange($event)"></af-form>
    <button class="btn btn-primary" (click)="printFormData()">Print Form Data</button>
  `
})
export class SimpleExampleComponent {

  myFormData = {
    textField: 'This is some text',
    numberField: 42,
    listField: 'Orange'
  };

  myFormDefinition = {
    layout: [['textField'], ['numberField', 'listField']],
    fields: [
      {
        name: 'textField',
        fieldType: 'Text',
        label: 'Text Field Label'
      },
      {
        name: 'numberField',
        fieldType: 'Number',
        label: 'Number Field Label'
      },
      {
        name: 'listField',
        fieldType: 'List',
        label: 'List Field Label',
        listOptions: ['Banana', 'Orange', 'Grape', 'Apple']
      }
    ]
  };

  onFormFieldChange(formChangeData) {
    console.log('onFormFieldChange() called!');
    console.log(formChangeData);
  }

  printFormData(): void {
    alert('Look at the console to view the form data that was printed to the console!');
    console.log(this.myFormData);
  }

}
```

