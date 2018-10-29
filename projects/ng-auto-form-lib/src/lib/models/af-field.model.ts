export enum AfFieldType {
    Text = 'Text',
    Number = 'Number',
    List = 'List',
    MultiList = 'MultiList',
    Date = 'Date',
    File = 'File',
    Logical = 'Logical',
    Memo = 'Memo',
    ImageList = 'ImageList',
    Relationship = 'Relationship',
    Link = 'Link',
    CASNumber = 'CASNumber',
    NFPA = 'NFPA'
}

export enum AfFieldValidationName {
    Required = 'Required',
    Email = 'Email',
    MinLength = 'MinLength',
    MaxLength = 'MaxLength',
    Pattern = 'Pattern',
    Min = 'Min',
    Max = 'Max',
    GreaterThan = 'GreaterThan',
    LessThan = 'LessThan'
}

export class AfFieldValidation {
    /** The validation to apply */
    name: AfFieldValidationName;

    /** A value to provide the validator (e.g. a number when using 'MinLength') */
    value?: any;

    constructor(name: AfFieldValidationName, value?: any) {
        this.name = name;
        this.value = value;
    }
}

export class AfFieldVisibility {
    /** The field to check the value of */
    fieldName: string;

    /** The values that cause this field to become hidden */
    values: string[];
}

export class AfField {
    /** A unique name for the field */
    name: string;

    /** The type of field */
    fieldType: AfFieldType;

    /** The label for the field (optional) */
    label: string;

    /** Whether this field should display as readonly */
    readOnly = false;

    /** A tool tip to display on the label (optional) */
    tooltip?: string;

    /** Any validations to apply to the field (optional) */
    validations?: AfFieldValidation[] = [];

    /** Conditional visibility settings */
    visibility?: AfFieldVisibility[] = [];

    /** Whether this field should be focused */
    focus = false;

    constructor(name: string, fieldType: AfFieldType, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        this.name = name;
        this.fieldType = fieldType;
        this.label = label;
        this.validations = validations;
        this.tooltip = tooltip;
        this.readOnly = readOnly;
    }
}

export class AfTextField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.Text, label, validations, tooltip, readOnly);
    }
}

export class AfMemoField extends AfField {

    /** How tall the memo field is */
    rows = 6;

    /** How wide the memo field is */
    cols = 40;

    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false, rows = 6, cols = 40) {
        super(name, AfFieldType.Memo, label, validations, tooltip, readOnly);
        this.rows = rows;
        this.cols = cols;
    }
}

export class AfNumberField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.Number, label, validations, tooltip, readOnly);
    }
}

export class AfListField extends AfField {
    /** A list of selectable options */
    listOptions: any[];

    /** The field to use as the display value when the list options are objects */
    displayFieldName = 'name';

    /** The field to use as the value when the list options are objects */
    valueFieldName = 'id';

    constructor(name: string, listOptions: any[], displayFieldName: string = 'name', valueFieldName: string = 'id',
        label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.List, label, validations, tooltip, readOnly);
        this.listOptions = listOptions;
        this.displayFieldName = displayFieldName;
        this.valueFieldName = valueFieldName;
    }
}

export class AfMultiListField extends AfField {
    /** A list of selectable options */
    listOptions: any[];

    /** The field to use as the display value when the list options are objects */
    displayFieldName = 'name';

    /** The field to use as the value when the list options are objects */
    valueFieldName = 'id';

    /** The height of the select field in rows*/
    size: number = null;

    constructor(name: string, listOptions: any[], displayFieldName: string = 'name', valueFieldName: string = 'id',
        label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', size: number = null,
        readOnly = false) {
        super(name, AfFieldType.MultiList, label, validations, tooltip, readOnly);
        this.listOptions = listOptions;
        this.displayFieldName = displayFieldName;
        this.valueFieldName = valueFieldName;
        this.size = size;
    }
}


export class AfDateField extends AfField {

    /** The date mask to apply */
    dateMask = 'MM/DD/YYYY';

    constructor(name: string, label: string = '', dateMask = 'MM/DD/YYYY', validations: AfFieldValidation[] = [], tooltip: string = '', readonly = false) {
        super(name, AfFieldType.Date, label, validations, tooltip);

        this.dateMask = dateMask;
    }
}

export class AfLogicalField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readonly = false) {
        super(name, AfFieldType.Logical, label, validations, tooltip);
    }
}

export class AfFileField extends AfField {
    acceptedfileTypes = '';

    constructor(name: string, label: string = '', acceptedfileTypes = '', validations: AfFieldValidation[] = [], tooltip: string = '') {
        super(name, AfFieldType.File, label, validations, tooltip);
        this.acceptedfileTypes = acceptedfileTypes;
    }
}

export class AfImageListField extends AfField {
    /** The list of images and their text value to display */
    imageOptions: any[] = [];

    /** Whether the user can select multiple options */
    isMultiple = false;

    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', imageOptions = [], isMultiple = false, readonly = false) {
        super(name, AfFieldType.ImageList, label, validations, tooltip, readonly);
        this.imageOptions = imageOptions;
        this.isMultiple = isMultiple;
    }
}

export class AfRelationshipField extends AfField {
    /** The field to use as the display name */
    displayNameField = 'name';

    relationshipServiceConfig: any = null;

    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readonly = false, displayNameField = 'name', relationshipServiceConfig: any) {
        super(name, AfFieldType.Relationship, label, validations, tooltip, readonly);
        this.displayNameField = displayNameField;
        this.relationshipServiceConfig = relationshipServiceConfig;
    }
}

export class AfLinkField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.Link, label, validations, tooltip, readOnly);
    }
}

export class AfCASNumberField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.CASNumber, label, validations, tooltip, readOnly);
    }
}

export class AfNFPAField extends AfField {
    constructor(name: string, label: string = '', validations: AfFieldValidation[] = [], tooltip: string = '', readOnly = false) {
        super(name, AfFieldType.NFPA, label, validations, tooltip, readOnly);
    }
}