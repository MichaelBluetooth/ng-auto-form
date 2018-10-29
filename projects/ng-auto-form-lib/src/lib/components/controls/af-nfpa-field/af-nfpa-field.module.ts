import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfNFPAFieldComponent } from './af-nfpa-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
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