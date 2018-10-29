import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfCasFieldComponent } from './af-cas-field.component';
import { AfCasNumberValidationService } from './validation/af-cas-number-validation.service';
import { AfFocusModule } from './../../../directives/af-focus.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
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