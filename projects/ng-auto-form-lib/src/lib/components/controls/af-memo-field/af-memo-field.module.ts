import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfMemoFieldComponent } from './af-memo-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule
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
