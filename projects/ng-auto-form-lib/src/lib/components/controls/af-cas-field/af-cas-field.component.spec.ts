import { AfCasNumberValidationService } from './validation/af-cas-number-validation.service';
import { AfCasFieldComponent } from './af-cas-field.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfFocusModule } from '../../../directives/af-focus.module';

describe('AfCasFieldComponent', () => {
  let component: AfCasFieldComponent;
  let fixture: ComponentFixture<AfCasFieldComponent>;
  const initialValue = '50-36-2';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
      ],
      declarations: [AfCasFieldComponent],
      providers: [AfCasNumberValidationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfCasFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.textValue = initialValue;
      fixture.detectChanges();
    });

    it('should render the text content', () => {
      fixture.whenStable().then(() => {
        const textContentElement = fixture.debugElement.query(By.css('div'));
        expect(textContentElement.nativeElement.textContent).toBe(component.textValue);
      });
    });

    it('should not render an input', () => {
      fixture.whenStable().then(() => {
        const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
        expect(inputElement).toBeNull();
      });
    });
  });

  it('should have the expected values when input is given', () => {
    component.textValue = initialValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement = fixture.debugElement.nativeElement.querySelector('input');
      expect(inputElement.value).toBe(initialValue);
      const secondValue = '50-00-0';
      inputElement.value = secondValue;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputElement.value).toBe(secondValue);
      });
    });
  });

  it('should make the input element disabled when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
      expect(inputElement).not.toBeNull();
      expect(inputElement.disabled).toBe(true);
    });
  });

  describe('CAS Number validation', () => {
    it('should display a warning when the input is not a valid casno', () => {
      component.textValue = '0213323';
      fixture.detectChanges();
      const warningElement: any = fixture.debugElement.nativeElement.querySelector('.warning');
      expect(warningElement).not.toBe(null);
    });

    it('should not display a warning when the input is valid casno', () => {
      component.textValue = '50-36-2';
      fixture.detectChanges();
      const warningElement: any = fixture.debugElement.nativeElement.querySelector('.warning');
      expect(warningElement).toBe(null);
    });
  });
});