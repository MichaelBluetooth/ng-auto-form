import { AfLogicalFieldModule } from './af-logical-field.module';
import { NgControl, AbstractControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfLogicalFieldComponent } from './af-logical-field.component';

class MockNgControl extends NgControl {
  control: AbstractControl;
  viewToModelUpdate(newValue: any): void { }
}

describe('AfLogicalFieldComponent', () => {
  let component: AfLogicalFieldComponent;
  let fixture: ComponentFixture<AfLogicalFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AfLogicalFieldModule
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfLogicalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.logicalValue = true;
      fixture.detectChanges();
    });

    it('should display text', () => {
      fixture.whenStable().then(() => {
        const divElement = fixture.debugElement.nativeElement.querySelector('div');
        expect(divElement.textContent).toBe('true');
      });
    });

    it('should not render an input', () => {
      fixture.whenStable().then(() => {
        const inputElement = fixture.debugElement.nativeElement.querySelector('input');
        expect(inputElement).toBeNull();
      });
    });
  });

  it('should have the expected values when clicked on', () => {
    component.logicalValue = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement = fixture.debugElement.nativeElement.querySelector('input');
      expect(inputElement.checked).toBe(true);
      inputElement.click();
      fixture.whenStable().then(() => {
        expect(inputElement.checked).toBe(false);
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
});
