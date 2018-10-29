import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfFileFieldComponent } from './af-file-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
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