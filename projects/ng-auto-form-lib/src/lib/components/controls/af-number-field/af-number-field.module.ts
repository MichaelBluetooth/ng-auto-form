import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfNumberFieldComponent } from './af-number-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfNumberFieldComponent
    ],
    exports: [
        AfNumberFieldComponent
    ]
})
export class AfNumberFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfNumberFieldModule,
      providers: []
    };
  }
}
