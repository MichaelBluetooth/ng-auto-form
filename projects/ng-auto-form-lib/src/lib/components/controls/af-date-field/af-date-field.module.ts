import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders  } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AfDateFieldComponent } from './af-date-field.component';
import { AfValidationModule } from '../../../validators/af-validation.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        AfFocusModule,
        AfValidationModule
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
