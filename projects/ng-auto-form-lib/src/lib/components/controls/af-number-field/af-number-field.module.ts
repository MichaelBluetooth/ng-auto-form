import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfNumberFieldComponent } from './af-number-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule
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
