import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfLogicalFieldComponent } from './af-logical-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
    ],
    declarations: [
        AfLogicalFieldComponent
    ],
    exports: [
        AfLogicalFieldComponent
    ]
})
export class AfLogicalFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfLogicalFieldModule,
      providers: []
    };
  }
}