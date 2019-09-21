import { AfMemoFieldModule } from './af-memo-field.module';
import { NgControl, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { AfMemoFieldComponent } from './af-memo-field.component';

class MockNgControl extends NgControl {
  control: AbstractControl;
  viewToModelUpdate(newValue: any): void { }
}

describe('AfMemoFieldComponent', () => {
  let component: AfMemoFieldComponent;
  let fixture: ComponentFixture<AfMemoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AfMemoFieldModule
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfMemoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('when in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.memoValue = 'Test Memo Value';
      fixture.detectChanges();
    });

    it('should render the text content', () => {
      fixture.whenStable().then(() => {
        const textContentElement = fixture.debugElement.query(By.css('div'));
        expect(textContentElement.nativeElement.textContent).toBe(component.memoValue);
      });
    });

    it('should not render an input', () => {
      fixture.whenStable().then(() => {
        const inputElement: any = fixture.debugElement.nativeElement.querySelector('textarea');
        expect(inputElement).toBeNull();
      });
    });
  });

  describe('init', () => {
    it('should use the default rows/cols when no values are provided', () => {
      component.ngOnInit();
      expect(component.rows).toBe(component.defaultRows);
      expect(component.cols).toBe(component.defaultCols);
    })
  });

  it('should have the expected values when input is given', () => {
    component.memoValue = 'First Value';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement = fixture.debugElement.nativeElement.querySelector('textarea');
      expect(inputElement.value).toBe('First Value');
      inputElement.value = 'Second Value';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(inputElement.value).toBe('Second Value');
      });
    });
  });

  it('should make the textarea element disabled when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement: any = fixture.debugElement.nativeElement.querySelector('textarea');
      expect(inputElement).not.toBeNull();
      expect(inputElement.disabled).toBe(true);
    });
  });
});