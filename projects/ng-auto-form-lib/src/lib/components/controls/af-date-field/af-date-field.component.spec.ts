import { AfDateFieldModule } from './af-date-field.module';
import { NgControl, AbstractControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfDateFieldComponent } from './af-date-field.component';

class MockNgControl extends NgControl {
  control: AbstractControl;
  viewToModelUpdate(newValue: any): void { }
}

describe('AfDateFieldComponent', () => {
  let component: AfDateFieldComponent;
  let fixture: ComponentFixture<AfDateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AfDateFieldModule
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('When in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      component.dateMask = 'MM/dd/yyyy';
      component.dateValue = new Date(2012, 10, 20).toISOString();
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should not display an input', () => {
      const element = fixture.debugElement.query(By.css('input'));
      expect(element).toBe(null);
    });

    it('should display the date', () => {
      fixture.whenStable().then(() => {
        const element = fixture.debugElement.query(By.css('div'));
        expect(element.nativeElement.textContent).toBe('11/20/2012');
      });
    });
  });

  it('should set the value to null when no initial value is given', () => {
    component.writeValue(null);
    expect(component.dateValue).toBe(null);
  });

  it('should set the value to an ISO date string when given a valid date', () => {
    spyOn(component, 'onChangeCallback');
    const date = new Date(2017, 11, 20, 0, 0, 0);
    component.onValueChange(date);
    expect(component.onChangeCallback).toHaveBeenCalledWith(date.toISOString());
  });

  it('should set the value to an empty string when given an invalid date', () => {
    spyOn(component, 'onChangeCallback');
    component.onValueChange(new Date('asdf'));
    expect(component.dateValue).toBe(null);
    expect(component.onChangeCallback).toHaveBeenCalledWith(null);
  });

  it('should set the value to an empty string when given null', () => {
    spyOn(component, 'onChangeCallback');
    component.onValueChange(null);
    expect(component.dateValue).toBe(null);
    expect(component.onChangeCallback).toHaveBeenCalledWith(null);
  });

  it('should make the select element disabled when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
      expect(inputElement).not.toBeNull();
      expect(inputElement.disabled).toBe(true);
    });
  });
});
