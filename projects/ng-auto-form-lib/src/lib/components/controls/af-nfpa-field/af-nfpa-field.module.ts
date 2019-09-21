import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfNFPAFieldComponent } from './af-nfpa-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
    ],
    declarations: [
        AfNFPAFieldComponent
    ],
    exports: [
        AfNFPAFieldComponent
    ]
})
export class AfNFPAFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfNFPAFieldModule,
      providers: []
    };
  }
}
