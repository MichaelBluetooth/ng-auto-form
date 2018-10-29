import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AfDateFieldComponent } from './af-date-field.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        AfFocusModule
    ],
    declarations: [
        AfDateFieldComponent
    ],
    exports: [
        AfDateFieldComponent
    ]
})
export class AfDateFieldModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfDateFieldModule,
      providers: []
    };
  }
}