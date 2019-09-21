import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfTextFieldComponent } from './af-text-field.component';
import { AfValidationModule } from './../../../validators/af-validation.module';
import { AfFocusModule } from './../../../directives/af-focus.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfTextFieldComponent
    ],
    exports: [
        AfTextFieldComponent
    ]
})
export class AfTextFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfTextFieldModule,
      providers: []
    };
  }
}
