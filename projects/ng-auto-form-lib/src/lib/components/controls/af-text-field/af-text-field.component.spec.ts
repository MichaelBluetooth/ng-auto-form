import { AfFocusModule } from './../../../directives/af-focus.module';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AfTextFieldComponent } from './af-text-field.component';

describe('AfTextFieldComponent', () => {
  let component: TestAfTextFieldComponent;
  let fixture: ComponentFixture<TestAfTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
      ],
      declarations: [AfTextFieldComponent, TestAfTextFieldComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAfTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ReadOnly', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.myModel.myTextValue = 'Test Text Value';
      fixture.detectChanges();
    });

    it('should render the text content', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const textContentElement = fixture.debugElement.query(By.css('div'));
          expect(textContentElement.nativeElement.textContent).toBe(component.myModel.myTextValue);
        });
      });
    });

    it('should not render an input', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
          expect(inputElement).toBeNull();
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
          myTextValue: 'Test Text Value'
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
            expect(inputElement).not.toBeNull();
            expect(inputElement.value).toBe('Test Text Value');
          });
        });
      });
    }));

    it('should update the value when someone types into it', async(() => {
      fixture.whenStable().then(() => {
        const element = fixture.debugElement.query(By.css('input')).nativeElement;
        element.value = 'test input';
        element.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
            expect(inputElement).not.toBeNull();
            expect(inputElement.value).toBe('test input');
            expect(component.myModel.myTextValue).toBe('test input');
          });
        });
      });
    }));
  });
});

@Component({
  selector: 'af-test-text-field',
  template: `
  <af-text-field [(ngModel)]="myModel.myTextValue" [readOnly]="readOnly" [disabled]="disabled">
  </af-text-field>`
})
export class TestAfTextFieldComponent {
  readOnly = false;
  disabled = false;

  myModel = {
    myTextValue: ''
  };
}
