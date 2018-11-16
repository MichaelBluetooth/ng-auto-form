import { RelationshipFieldExampleService } from './relationship-field-example/relationship-field-example.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgAutoFormModule } from 'ng-auto-form-lib';
import { SimpleExampleComponent } from './simple-example/simple-example.component';
import { ListFieldExampleComponent } from './list-field-example/list-field-example.component';
import { MultiListFieldExampleComponent } from './multi-list-field-example/multi-list-field-example.component';
import { CasnoFieldExampleComponent } from './casno-field-example/casno-field-example.component';
import { ImageListFieldExampleComponent } from './image-list-field-example/image-list-field-example.component';
import { TextFieldExampleComponent } from './text-field-example/text-field-example.component';
import { NfaFieldExampleComponent } from './nfa-field-example/nfa-field-example.component';
import { MemoFieldExampleComponent } from './memo-field-example/memo-field-example.component';
import { NumberFieldExampleComponent } from './number-field-example/number-field-example.component';
import { LogicalFieldExampleComponent } from './logical-field-example/logical-field-example.component';
import { RelationshipFieldExampleComponent } from './relationship-field-example/relationship-field-example.component';
import { DateFieldExampleComponent } from './date-field-example/date-field-example.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    TabsModule.forRoot(),
    NgAutoFormModule.forRoot({ relationshipService: RelationshipFieldExampleService })
  ],
  declarations: [
    SimpleExampleComponent,
    ListFieldExampleComponent,
    MultiListFieldExampleComponent,
    CasnoFieldExampleComponent,
    ImageListFieldExampleComponent,
    TextFieldExampleComponent,
    NfaFieldExampleComponent,
    MemoFieldExampleComponent,
    NumberFieldExampleComponent,
    LogicalFieldExampleComponent,
    RelationshipFieldExampleComponent,
    DateFieldExampleComponent
  ],
  exports: [
    SimpleExampleComponent,
    ListFieldExampleComponent,
    MultiListFieldExampleComponent,
    CasnoFieldExampleComponent,
    ImageListFieldExampleComponent
  ]
})
export class DocumentationModule { }
