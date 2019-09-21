import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AfValidationService } from '../af-validation.service';

@Component({
    selector: 'af-control-messages',
    template: `<div style="position: absolute; font-size: 12px" class="text-danger" *ngIf="getErrorMessage().length">{{getErrorMessage()}}</div>`
})
export class AfControlMessagesComponent {

    @Input() control: FormControl;

    constructor(private validationService: AfValidationService) { }

    getErrorMessage() {
        const errorMsgs = [];
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                errorMsgs.push(this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]));
            }
        }

        return errorMsgs.join(', ');
    }
}