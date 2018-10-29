import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AfImageListFieldComponent } from './af-image-list-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
    ],
    declarations: [
        AfImageListFieldComponent
    ],
    exports: [
        AfImageListFieldComponent
    ]
})
export class AfImageListFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfImageListFieldModule,
      providers: []
    };
  }
}