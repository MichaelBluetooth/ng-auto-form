import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfTextFieldComponent } from './af-text-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule
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
