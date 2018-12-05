import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DocumentationModule } from './documentation/documentation.module';
import { TextFieldExampleComponent } from './documentation/text-field-example/text-field-example.component';
import { CasnoFieldExampleComponent } from './documentation/casno-field-example/casno-field-example.component';
import { ListFieldExampleComponent } from './documentation/list-field-example/list-field-example.component';
import { SimpleExampleComponent } from './documentation/simple-example/simple-example.component';
import { MultiListFieldExampleComponent } from './documentation/multi-list-field-example/multi-list-field-example.component';
import { ImageListFieldExampleComponent } from './documentation/image-list-field-example/image-list-field-example.component';
import { NfaFieldExampleComponent } from './documentation/nfa-field-example/nfa-field-example.component';
import { MemoFieldExampleComponent } from './documentation/memo-field-example/memo-field-example.component';
import { NumberFieldExampleComponent } from './documentation/number-field-example/number-field-example.component';
import { LogicalFieldExampleComponent } from './documentation/logical-field-example/logical-field-example.component';
import { RelationshipFieldExampleComponent } from './documentation/relationship-field-example/relationship-field-example.component';
import { DateFieldExampleComponent } from './documentation/date-field-example/date-field-example.component';
import { ValidationExampleComponent } from './documentation/validation-example/validation-example.component';

const appRoutes: Routes = [
  { path: 'getting-started', component: SimpleExampleComponent },
  { path: 'fields/text', component: TextFieldExampleComponent },
  { path: 'fields/list', component: ListFieldExampleComponent },
  { path: 'fields/number', component: NumberFieldExampleComponent },
  { path: 'fields/multilist', component: MultiListFieldExampleComponent },
  { path: 'fields/imagelist', component: ImageListFieldExampleComponent },
  { path: 'fields/casno', component: CasnoFieldExampleComponent },
  { path: 'fields/nfpa', component: NfaFieldExampleComponent },
  { path: 'fields/memo', component: MemoFieldExampleComponent },
  { path: 'fields/logical', component: LogicalFieldExampleComponent },
  { path: 'fields/relationship', component: RelationshipFieldExampleComponent },
  { path: 'fields/date', component: DateFieldExampleComponent },
  { path: 'validation', component: ValidationExampleComponent },
  { path: '', redirectTo: '/getting-started', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    DocumentationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
