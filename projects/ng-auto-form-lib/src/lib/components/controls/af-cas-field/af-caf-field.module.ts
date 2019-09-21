import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfCasFieldComponent } from './af-cas-field.component';
import { AfCasNumberValidationService } from './validation/af-cas-number-validation.service';
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
        AfCasFieldComponent
    ],
    providers: [
        AfCasNumberValidationService
    ],
    exports: [
        AfCasFieldComponent
    ]
})
export class AfCasFieldModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AfCasFieldModule,
            providers: [
                AfCasNumberValidationService
            ]
        };
    }
}
