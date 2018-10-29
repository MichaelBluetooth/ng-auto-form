import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfLinkFieldComponent } from './af-link-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
    ],
    declarations: [
        AfLinkFieldComponent
    ],
    exports: [
        AfLinkFieldComponent
    ]
})
export class AfLinkFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfLinkFieldModule,
      providers: []
    };
  }
}