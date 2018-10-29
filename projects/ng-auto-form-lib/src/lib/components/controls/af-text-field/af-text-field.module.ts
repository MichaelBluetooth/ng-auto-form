import { AfFocusModule } from './../../../directives/af-focus.module';
import { AfFocusDirective } from './../../../directives/af-focus.directive';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfTextFieldComponent } from './af-text-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
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