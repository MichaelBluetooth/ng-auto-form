# NgAutoForm

An Angular component library for generating forms based on metadata definitions.

This library leans heavily on bootstrap (for styles), ngx-bootstrap (mostly for their date picker) and font-awesome (for icons).

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

4. Import NgAutoForm in your app module

```
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