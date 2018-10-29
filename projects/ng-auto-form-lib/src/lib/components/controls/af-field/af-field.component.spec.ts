import { AfFocusModule } from './../../../directives/af-focus.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AfTextField, AfDateField, AfNumberField, AfListField, AfFileField, AfLogicalField, AfMemoField, AfImageListField, AfRelationshipField, AfField, AfLinkField, AfCASNumberField, AfNFPAField, AfMultiListField } from './../../../models/af-field.model';
import { AfFieldComponent } from './af-field.component';
import { AfNFPAFieldModule } from '../af-nfpa-field/af-nfpa-field.module';
import { AfListFieldModule } from '../af-list-field/af-list-field.module';
import { AfImageListFieldModule } from '../af-image-list-field/af-image-list-field.module';
import { AfFileFieldModule } from '../af-file-field/af-file-field.module';
import { AfDateFieldModule } from '../af-date-field/af-date-field.module';
import { AfCasFieldModule } from './../af-cas-field/af-caf-field.module';
import { AfLinkFieldModule } from './../af-link-field/af-link-field.module';
import { AfLogicalFieldModule } from './../af-logical-field/af-logical-field.module';
import { AfMemoFieldModule } from './../af-memo-field/af-memo-field.module';
import { AfNumberFieldModule } from './../af-number-field/af-number-field.module';
import { AfTextFieldModule } from './../af-text-field/af-text-field.module';
import { AfRelationshipFieldModule } from './../af-relationship-field/af-relationship-field.module';

describe('AfFieldComponent', () => {
  let component: AfFieldComponent;
  let fixture: ComponentFixture<AfFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        TooltipModule.forRoot(),
        AfRelationshipFieldModule.forRoot(),
        AfTextFieldModule.forRoot(),
        AfNumberFieldModule.forRoot(),
        AfNFPAFieldModule.forRoot(),
        AfMemoFieldModule.forRoot(),
        AfLogicalFieldModule.forRoot(),
        AfListFieldModule.forRoot(),
        AfLinkFieldModule.forRoot(),
        AfImageListFieldModule.forRoot(),
        AfFileFieldModule.forRoot(),
        AfDateFieldModule.forRoot(),
        AfCasFieldModule.forRoot(),
        AfFocusModule
      ],
      declarations: [
        AfFieldComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('The field label', () => {
    it('should not display a label if a value is not present', () => {
      component.field = new AfTextField('myTextField', '');
      fixture.detectChanges();
      const labelElement: any = fixture.debugElement.nativeElement.querySelector('label');
      expect(labelElement).toBeNull();
    });

    it('should display a label if a value is present', () => {
      component.field = new AfTextField('myTextField', 'Test Label');
      fixture.detectChanges();
      const labelElement: any = fixture.debugElement.nativeElement.querySelector('label');
      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toBe('Test Label');
    });
  });

  describe('The field tooltip', () => {
    it('should display a tooltip if a value is present', () => {
      component.field = new AfTextField('myTextField', 'Test Label', [], 'Test Tooltip');
      fixture.detectChanges();
      const labelElement: any = fixture.debugElement.nativeElement.querySelector('label');
      labelElement.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const tooltopElement: any = fixture.debugElement.nativeElement.querySelector('bs-tooltip-container');
        expect(tooltopElement).not.toBeNull();
        expect(tooltopElement.textContent).toContain('Test Tooltip');
      });
    });

    it('should not display a tooltip if a value is not present', () => {
      component.field = new AfTextField('myTextField', 'Test Label', [], '');
      fixture.detectChanges();
      const labelElement: any = fixture.debugElement.nativeElement.querySelector('label');
      labelElement.dispatchEvent(new Event('mouseenter'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const tooltopElement: any = fixture.debugElement.nativeElement.querySelector('bs-tooltip-container');
        expect(tooltopElement).toBeNull();
      });
    });
  });

  describe('Text', () => {
    beforeEach(() => {
      component.field = new AfTextField('myTextField');
      fixture.detectChanges();
    });

    it('should know it is a text field', () => {
      expect(component.isTextField()).toBe(true);
    });

    it('should render a text field', () => {
      const textElement = fixture.debugElement.nativeElement.querySelector('af-text-field');
      expect(textElement).toBeDefined();
    });

    it('should bind to the given text value', () => {
      component.writeValue('This is text');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const input = fixture.debugElement.nativeElement.querySelector('input');
          expect(input.value).toBe('This is text');
        });
      });
    });
  });

  describe('Number', () => {
    beforeEach(() => {
      component.field = new AfNumberField('myNumberField');
    });

    it('should know it is a number field', () => {
      expect(component.isNumberField()).toBe(true);
    });

    it('should render a number field', () => {
      const numberElement = fixture.debugElement.nativeElement.querySelector('af-number-field');
      expect(numberElement).toBeDefined();
    });

    it('should bind to the given number value', () => {
      component.writeValue(500);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const input = fixture.debugElement.nativeElement.querySelector('input');
          expect(input.value).toEqual('500');
        });
      });
    });
  });

  describe('Memo', () => {
    beforeEach(() => {
      component.field = new AfMemoField('myMemoField');
    });

    it('should know it is a memo field', () => {
      expect(component.isMemoField()).toBe(true);
    });

    it('should render a memo field', () => {
      const memoElement = fixture.debugElement.nativeElement.querySelector('af-memo-field');
      expect(memoElement).toBeDefined();
    });

    it('should bind to the given memo value', () => {
      component.writeValue('I am a memo');
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const input = fixture.debugElement.nativeElement.querySelector('textarea');
          expect(input.textContent).toEqual('I am a memo');
        });
      });
    });
  });

  describe('Date', () => {
    beforeEach(() => {
      component.field = new AfDateField('myDateField');
    });

    it('should know it is a date field', () => {
      expect(component.isDateField()).toBe(true);
    });

    it('should render a date field', () => {
      const dateFieldElement = fixture.debugElement.nativeElement.querySelector('af-date-field');
      expect(dateFieldElement).toBeDefined();
    });

    //TODO: probably need to re-work how users provide initial values to this
    // it('should bind to the given date value', () => {
    //   component.writeValue(new Date(2017, 11, 20));
    //   fixture.detectChanges();
    //   fixture.whenStable().then(() => {
    //     fixture.detectChanges();
    //     fixture.whenStable().then(() => {
    //       const input = fixture.debugElement.nativeElement.querySelector('input');
    //       expect(input.value).toEqual('2017-12-20T05:00:00.000Z');
    //     });
    //   });
    // });
  });

  describe('List', () => {
    beforeEach(() => {
      component.field = new AfListField('myListField', ['opt1', 'opt2']);
    });

    it('should know it is a list field', () => {
      expect(component.isListField()).toBe(true);
    });

    it('should render a list field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-list-field');
      expect(field).toBeDefined();
    });
  });

  describe('MultiList', () => {
    beforeEach(() => {
      component.field = new AfMultiListField('myListField', ['opt1', 'opt2']);
    });

    it('should know it is a multi list field', () => {
      expect(component.isMultiListField()).toBe(true);
    });

    it('should render a multi list field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-multi-list-field');
      expect(field).toBeDefined();
    });
  });

  describe('Logical', () => {
    beforeEach(() => {
      component.field = new AfLogicalField('myLogicalField', 'My Logical Label', []);
    });

    it('should know it is a logical field', () => {
      expect(component.isLogicalField()).toBe(true);
    });

    it('should render a logical field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-logical-field');
      expect(field).toBeDefined();
    });
  });

  describe('File', () => {
    beforeEach(() => {
      component.field = new AfFileField('myFileField', 'My File Label', '.pdf', []);
    });

    it('should know it is a file field', () => {
      expect(component.isFileField()).toBe(true);
    });

    it('should render a file field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-file-field');
      expect(field).toBeDefined();
    });
  });

  describe('ImageList', () => {
    beforeEach(() => {
      component.field = new AfImageListField('myFileField', 'My File Label', [], '', []);
    });

    it('should know it is an image list field', () => {
      expect(component.isImageListField()).toBe(true);
    });

    it('should render an image list field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-image-list-field');
      expect(field).toBeDefined();
    });
  });

  describe('Relationship', () => {
    beforeEach(() => {
      component.field = new AfRelationshipField('myFileField', 'My File Label', [], '', false, '', {});
    });

    it('should know it is a relationship field', () => {
      expect(component.isRelationshipField()).toBe(true);
    });

    it('should render relationship list field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-relationship-field');
      expect(field).toBeDefined();
    });
  });

  describe('Link', () => {
    beforeEach(() => {
      component.field = new AfLinkField('myLinkField', 'My Link Label', [], '', false);
    });

    it('should know it is a link field', () => {
      expect(component.isLinkField()).toBe(true);
    });

    it('should render link field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-link-field');
      expect(field).toBeDefined();
    });
  });

  describe('CASNumber', () => {
    beforeEach(() => {
      component.field = new AfCASNumberField('myCASField');
    });

    it('should know it is a CAS number field', () => {
      expect(component.isCASNumberField()).toBe(true);
    });

    it('should render a CAS number field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-cas-field');
      expect(field).toBeDefined();
    });
  });

  describe('NFPA', () => {
    beforeEach(() => {
      component.field = new AfNFPAField('myNFPAField');
    });

    it('should know it is a NFPA field', () => {
      expect(component.isNFPAField()).toBe(true);
    });

    it('should render an NFPA field', () => {
      const field = fixture.debugElement.nativeElement.querySelector('af-nfpa-field');
      expect(field).toBeDefined();
    });
  });

});