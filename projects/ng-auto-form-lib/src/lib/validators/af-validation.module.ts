import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AfControlMessagesComponent } from './af-control-message/af-control-message.component';
import { AfValidationService } from './af-validation.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AfValidationService
    ],
    declarations: [
        AfControlMessagesComponent
    ],
    exports: [
        AfControlMessagesComponent
    ]
})
export class AfValidationModule {
    static forRoot(): ModuleWithProviders {
    return {
      ngModule: AfValidationModule,
      providers: []
    };
  }
}
