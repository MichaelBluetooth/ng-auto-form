import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfImageListFieldComponent } from './af-image-list-field.component';

@NgModule({
    imports: [
        CommonModule,
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
