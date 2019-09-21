import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfLogicalFieldComponent } from './af-logical-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfLogicalFieldComponent
    ],
    exports: [
        AfLogicalFieldComponent
    ]
})
export class AfLogicalFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfLogicalFieldModule,
      providers: []
    };
  }
}
