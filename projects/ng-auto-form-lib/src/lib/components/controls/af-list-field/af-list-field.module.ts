import { AfFocusModule } from './../../../directives/af-focus.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AfListFieldComponent } from './list/af-list-field.component';
import { AfListOptionsPipe } from './af-list-options.pipe';
import { AfMultiListFieldComponent } from './multi-list/af-multi-list-field.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AfFocusModule
    ],
    declarations: [
        AfListFieldComponent,
        AfMultiListFieldComponent,
        AfListOptionsPipe
    ],
    exports: [
        AfListFieldComponent,
        AfMultiListFieldComponent
    ]
})
export class AfListFieldModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AfListFieldModule,
            providers: []
        };
    }
}
