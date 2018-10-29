import { AfField, AfFieldVisibility } from './af-field.model';

export class AfForm {
    /** A collection of all fields that can appear in this form */
    fields: AfField[] = [];

    /** The layout */
    layout: string[][];
}
