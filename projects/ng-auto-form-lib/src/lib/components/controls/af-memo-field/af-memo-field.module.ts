import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfMemoFieldComponent } from './af-memo-field.component';
import { AfFocusModule } from './../../../directives/af-focus.module';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfMemoFieldComponent
    ],
    exports: [
        AfMemoFieldComponent
    ]
})
export class AfMemoFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfMemoFieldModule,
      providers: []
    };
  }
}
