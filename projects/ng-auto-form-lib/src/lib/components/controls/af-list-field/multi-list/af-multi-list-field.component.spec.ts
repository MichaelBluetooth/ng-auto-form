import { AfFocusModule } from './../../../../directives/af-focus.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfMultiListFieldComponent } from './af-multi-list-field.component';
import { AfListOptionsPipe } from './../af-list-options.pipe';

describe('AfMultiListFieldComponent', () => {
  let component: AfMultiListFieldComponent;
  let fixture: ComponentFixture<AfMultiListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule
      ],
      declarations: [
        AfListOptionsPipe,
        AfMultiListFieldComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfMultiListFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set the displayNameField and valueNameField to default values when none are provided', () => {
    component.ngOnInit();
    expect(component.displayFieldName).toBe('name');
    expect(component.valueFieldName).toBe('id');
  });

  it('should set the value when the list options are string', () => {
    component.listOpts = ['one', 'two', 'three'];
    component.writeValue(['two']);
    expect(component.selectedValue).toEqual(['two']);
  });

  it('should set the value when the list options are objects', () => {
    component.listOpts = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }, { id: 3, name: 'three' }];
    component.writeValue([{ id: 2, name: 'two' }]);
    expect(component.selectedValue).toEqual([{ id: 2, name: 'two' }]);
  });

  describe('When in readonly mode', () => {
    describe('and the otions are objects', () => {
      beforeEach(() => {
        component.readOnly = true;
        component.displayFieldName = 'theName';
        component.valueFieldName = 'identifier';
        component.listOpts = [{ identifier: 1, theName: 'one' }, { identifier: 2, theName: 'two' }, { identifier: 3, theName: 'three' }];
        component.selectedValue = [2];
        fixture.detectChanges();
      });

      it('should display text', () => {
        fixture.whenStable().then(() => {
          const element = fixture.debugElement.query(By.css('div'));
          expect(element.nativeElement.textContent).toContain('two');
        });
      });

      it('should not display an input', () => {
        fixture.whenStable().then(() => {
          const selectElement = fixture.debugElement.query(By.css('select'));
          expect(selectElement).toBeNull();
          const inputElement = fixture.debugElement.query(By.css('input'));
          expect(inputElement).toBeNull();
        });
      });
    });

    describe('and the otions are primitives', () => {
      beforeEach(() => {
        component.readOnly = true;
        component.listOpts = ['uno', 'dos', 'tres'];
        component.selectedValue = ['dos'];
        fixture.detectChanges();
      });

      it('should display text', () => {
        fixture.whenStable().then(() => {
          const element = fixture.debugElement.query(By.css('div'));
          expect(element.nativeElement.textContent).toContain('dos');
        });
      });

      it('should not display an input', () => {
        fixture.whenStable().then(() => {
          const element = fixture.debugElement.query(By.css('select'));
          expect(element).toBeNull();
        });
      });
    });
  });

  it('should render the selected values', () => {
    component.listOpts = ['one', 'two', 'three'];
    component.writeValue(['two', 'three']);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elements = fixture.debugElement.queryAll(By.css('option'));
      expect(elements.length).toBe(3);
      expect(elements[0].nativeElement.selected).toBe(false);
      expect(elements[1].nativeElement.selected).toBe(true);
      expect(elements[2].nativeElement.selected).toBe(true);
    });
  });

  it('should render the selected values when the values are objects with a name and id', () => {
    component.listOpts = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }, { id: 3, name: 'three' }];
    component.writeValue([2, 3]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elements = fixture.debugElement.queryAll(By.css('option'));
      expect(elements.length).toBe(3);
      expect(elements[0].nativeElement.selected).toBe(false);
      expect(elements[1].nativeElement.selected).toBe(true);
      expect(elements[2].nativeElement.selected).toBe(true);
    });
  });

  it('should render the selected values when the values are custom objects', () => {
    component.displayFieldName = 'display';
    component.valueFieldName = 'value';
    component.listOpts = [{ value: 1, display: 'uno' }, { value: 2, display: 'dos' }, { value: 3, display: 'tres' }];
    component.writeValue([2, 3]);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elements = fixture.debugElement.queryAll(By.css('option'));
      expect(elements.length).toBe(3);
      expect(elements[0].nativeElement.selected).toBe(false);
      expect(elements[1].nativeElement.selected).toBe(true);
      expect(elements[2].nativeElement.selected).toBe(true);
    });
  });

  it('should allow users to filter the options', () => {
    component.listOpts = ['one', 'two', 'three'];
    const inputElement = fixture.debugElement.query(By.css('input'));
    expect(inputElement).not.toBeNull();
    inputElement.nativeElement.value = 'two';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elements = fixture.debugElement.queryAll(By.css('option'));
      expect(elements.length).toBe(3);
      expect(elements[0].properties.hidden).toBe(true);
      expect(elements[1].properties.hidden).toBe(false);
      expect(elements[2].properties.hidden).toBe(true);
    });
  });

  it('should make the select element disabled when the component is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const selectElement: any = fixture.debugElement.nativeElement.querySelector('select');
      expect(selectElement).not.toBeNull();
      expect(selectElement.disabled).toBe(true);

      const inputElement: any = fixture.debugElement.nativeElement.querySelector('input');
      expect(inputElement).not.toBeNull();
      expect(inputElement.disabled).toBe(true);
    });
  });
});
