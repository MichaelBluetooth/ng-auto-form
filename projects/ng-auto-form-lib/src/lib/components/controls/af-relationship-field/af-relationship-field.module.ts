import { AfFocusModule } from './../../../directives/af-focus.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { AfRelationshipOptionsComponent } from './af-relationship-options/af-relationship-options.component';
import { AfRelationshipFieldComponent } from './af-relationship-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfRelationshipFieldComponent,
        AfRelationshipOptionsComponent
    ],
    exports: [
        AfRelationshipFieldComponent
    ]
})
export class AfRelationshipFieldModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AfRelationshipFieldModule,
            providers: []
        };
    }
}
