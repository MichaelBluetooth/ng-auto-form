import { AfFocusDirective } from './af-focus.directive';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AfFocusDirective
    ],
    exports: [
        AfFocusDirective
    ]
})
export class AfFocusModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AfFocusModule,
            providers: []
        };
    }
}
