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
import { ValidationExampleComponent } from './validation-example/validation-example.component';
import { Routes, RouterModule } from '@angular/router';
import { FileFieldExampleComponent } from './file-field-example/file-field-example.component';
import { DirectUsageExampleComponent } from './direct-usage-example/direct-usage-example.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  { path: 'fields/file', component: FileFieldExampleComponent },
  { path: 'validation', component: ValidationExampleComponent },
  { path: 'direct-usage', component: DirectUsageExampleComponent },
  { path: '', redirectTo: '/getting-started', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    NgAutoFormModule.forRoot({ relationshipService: RelationshipFieldExampleService }),
    RouterModule.forRoot(appRoutes),
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
    DateFieldExampleComponent,
    ValidationExampleComponent,
    FileFieldExampleComponent
    DirectUsageExampleComponent
  ],
  exports: [
    RouterModule
  ]
})
export class DocumentationModule { }
