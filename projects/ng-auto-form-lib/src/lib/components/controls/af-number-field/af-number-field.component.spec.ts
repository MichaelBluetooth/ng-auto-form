import { AfValidationModule } from './../../../validators/af-validation.module';
import { AfFocusModule } from './../../../directives/af-focus.module';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AfNumberFieldComponent } from './af-number-field.component';

describe('AfNumberFieldComponent', () => {
  let component: TestAfNumberFieldComponent;
  let fixture: ComponentFixture<TestAfNumberFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule,
        AfValidationModule
      ],
      declarations: [AfNumberFieldComponent, TestAfNumberFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAfNumberFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.myModel.myNumberValue = 100;
    });

    it('should not display an input', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
          expect(inputElement).toBeNull();
        });
      });
    });

    it('should display text', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const textElement = fixture.debugElement.nativeElement.querySelector('div');
          expect(textElement.nativeElement.textContent).toBe('100');
        });
      });
    });
  });

  describe('When the field is disabled', () => {
    it('should make the input element disabled', () => {
      fixture.whenStable().then(() => {
        component.disabled = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
            expect(inputElement).not.toBeNull();
            expect(inputElement.disabled).toBe(true);
          });
        });
      });
    });
  });

  describe('The input', () => {
    it('should bind to the given value and display it', async(() => {
      fixture.whenStable().then(() => {
        component.myModel = {
          myNumberValue: 100
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
            expect(inputElement).not.toBeNull();
            expect(inputElement.value).toBe('100');
          });
        });
      });
    }));

    it('should update the value when someone types into it', async(() => {
      fixture.whenStable().then(() => {
        const element = fixture.debugElement.query(By.css('input')).nativeElement;
        element.value = 32;
        element.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
            expect(inputElement).not.toBeNull();
            expect(inputElement.value).toBe('32');
            expect(component.myModel.myNumberValue).toBe(32);
          });
        });
      });
    }));
  });
});

@Component({
  selector: 'af-test-number-field',
  template: `
  <af-number-field #numberField [(ngModel)]="myModel.myNumberValue" [readOnly]="readOnly" [disabled]="disabled">
  </af-number-field>`
})
export class TestAfNumberFieldComponent {
  @ViewChild('numberField', {static: true}) numberField: AfNumberFieldComponent;

  readOnly = false;
  disabled = false;

  myModel = {
    myNumberValue: null
  };
}
