import { AfFocusModule } from './../../../directives/af-focus.module';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AfLogicalFieldComponent } from './af-logical-field.component';

describe('AfLogicalFieldComponent', () => {
  let component: AfLogicalFieldComponent;
  let fixture: ComponentFixture<AfLogicalFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
      ],
      declarations: [AfLogicalFieldComponent]
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
