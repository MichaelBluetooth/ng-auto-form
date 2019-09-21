import { AfFocusModule } from './directives/af-focus.module';
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AfFormBuilderService } from './components/af-form/af-form-builder.service';
import { AfFieldComponent } from './components/controls/af-field/af-field.component';
import { AfFormComponent } from './components/af-form/af-form.component';
import { AfControlMessagesComponent } from './validators/af-control-message/af-control-message.component';
import { AfRelationshipFieldModule } from './components/controls/af-relationship-field/af-relationship-field.module';
import { AfCasFieldModule } from './components/controls/af-cas-field/af-caf-field.module';
import { AfFileFieldModule } from './components/controls/af-file-field/af-file-field.module';
import { AfLinkFieldModule } from './components/controls/af-link-field/af-link-field.module';
import { AfListFieldModule } from './components/controls/af-list-field/af-list-field.module';
import { AfLogicalFieldModule } from './components/controls/af-logical-field/af-logical-field.module';
import { AfMemoFieldModule } from './components/controls/af-memo-field/af-memo-field.module';
import { AfNumberFieldModule } from './components/controls/af-number-field/af-number-field.module';
import { AfTextFieldModule } from './components/controls/af-text-field/af-text-field.module';
import { AfNFPAFieldModule } from './components/controls/af-nfpa-field/af-nfpa-field.module';
import { AfImageListFieldModule } from './components/controls/af-image-list-field/af-image-list-field.module';
import { AfDateFieldModule } from './components/controls/af-date-field/af-date-field.module';
import { RelationshipOptionsService, RelationshipOptionsServiceDefault } from './components/controls/af-relationship-field/af-relationship-options/relationship-options.service';
import { AfValidationModule } from './validators/af-validation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    TooltipModule.forRoot(),
    AfRelationshipFieldModule.forRoot(),
    AfTextFieldModule.forRoot(),
    AfNumberFieldModule.forRoot(),
    AfNFPAFieldModule.forRoot(),
    AfMemoFieldModule.forRoot(),
    AfLogicalFieldModule.forRoot(),
    AfListFieldModule.forRoot(),
    AfLinkFieldModule.forRoot(),
    AfImageListFieldModule.forRoot(),
    AfFileFieldModule.forRoot(),
    AfDateFieldModule.forRoot(),
    AfCasFieldModule.forRoot(),
    AfFocusModule.forRoot(),

    AfValidationModule
  ],
  declarations: [
    AfFieldComponent,
    AfFormComponent,
  ],
  providers: [
    AfFormBuilderService
  ],
  exports: [
    AfFormComponent,
    AfFieldComponent,
    AfRelationshipFieldModule,
    AfTextFieldModule,
    AfNumberFieldModule,
    AfNFPAFieldModule,
    AfMemoFieldModule,
    AfLogicalFieldModule,
    AfListFieldModule,
    AfLinkFieldModule,
    AfImageListFieldModule,
    AfFileFieldModule,
    AfDateFieldModule,
    AfCasFieldModule
  ]
})
export class NgAutoFormModule {
  static forRoot(config?: NgAutoFormConfig): ModuleWithProviders {
    return {
      ngModule: NgAutoFormModule,
      providers: [
        { provide: RelationshipOptionsService, useClass: (config && config.relationshipService) ?
           config.relationshipService : RelationshipOptionsServiceDefault }
      ]
    };
  }
}

export class NgAutoFormConfig {
  relationshipService: Type<RelationshipOptionsService>;
}
