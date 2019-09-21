import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfFileFieldComponent } from './af-file-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfValidationModule
    ],
    declarations: [
        AfFileFieldComponent
    ],
    exports: [
        AfFileFieldComponent
    ]
})
export class AfFileFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfFileFieldModule,
      providers: []
    };
  }
}
