import { AfLinkFieldModule } from './af-link-field.module';
import { DebugElement } from '@angular/core';
import {  AbstractControl, NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfLinkFieldComponent } from './af-link-field.component';

class MockNgControl extends NgControl {
  control: AbstractControl;
  viewToModelUpdate(newValue: any): void { }
}

describe('AfLinkFieldComponent', () => {
  let component: AfLinkFieldComponent;
  let fixture: ComponentFixture<AfLinkFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AfLinkFieldModule
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfLinkFieldComponent);
    component = fixture.componentInstance;
    component.linkValue = {
      href: 'http://www.google.com/',
      text: 'google'
    };
    fixture.detectChanges();
  });

  describe('Readonly Mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      fixture.detectChanges();
    });

    it('should display an anchor with the href and text', () => {
      const anchorElement: DebugElement = fixture.debugElement.query(By.css('a'));
      expect(anchorElement).not.toBeNull();
      expect(anchorElement.nativeElement.href).toBe(component.linkValue.href);
      expect(anchorElement.nativeElement.textContent).toBe(component.linkValue.text);
    });

    it('should not display an anchor if the value did not have an href', () => {
      component.linkValue = {
        href: null,
        text: 'google'
      };
      fixture.detectChanges();
      const anchorElement: DebugElement = fixture.debugElement.query(By.css('a'));
      expect(anchorElement).toBeNull();
    });
  });

  describe('Edit Mode', () => {
    it('should display two inputs for the text and href fields', () => {
      fixture.whenStable().then(() => {
        const inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElements.length).toBe(2);
        expect(inputElements[0].nativeElement.value).toBe(component.linkValue.text);
        expect(inputElements[1].nativeElement.value).toBe(component.linkValue.href);
      });
    });

    it('should update the text and execute the change callback when input is given to the text field', () => {
      spyOn(component, 'onChangeCallback');
      const inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('input'));
      inputElements[0].nativeElement.value = 'New Text Value';
      inputElements[0].nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.linkValue.text).toBe('New Text Value');
      expect(component.onChangeCallback).toHaveBeenCalledWith(jasmine.objectContaining({text: 'New Text Value'}));
    });

    it('should update the text and execute the change callback when input is given to the href field', () => {
      spyOn(component, 'onChangeCallback');
      const inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('input'));
      inputElements[1].nativeElement.value = 'http://www.nhl.com/';
      inputElements[1].nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.linkValue.href).toBe('http://www.nhl.com/');
      expect(component.onChangeCallback).toHaveBeenCalledWith(jasmine.objectContaining({href: 'http://www.nhl.com/'}));
    });


    describe('When disabled', () => {
      beforeEach(() => {
        component.setDisabledState(true);
        fixture.detectChanges();
      });

      it('should make the two inputs disabled', () => {
        fixture.whenStable().then(() => {
          const inputElements: DebugElement[] = fixture.debugElement.queryAll(By.css('input'));
          expect(inputElements[0].nativeElement.disabled).toBe(true);
          expect(inputElements[1].nativeElement.disabled).toBe(true);
        });
      });
    });
  });
});
