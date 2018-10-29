import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By, BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfListFieldComponent } from './af-list-field.component';
import { AfListOptionsPipe } from './../af-list-options.pipe';
import { AfFocusModule } from '../../../../directives/af-focus.module';

describe('AfListFieldComponent', () => {
    let component: AfListFieldComponent;
    let fixture: ComponentFixture<AfListFieldComponent>;

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
                AfListFieldComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AfListFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should set the value when the list options are string', () => {
        component.listOpts = ['one', 'two', 'three'];
        component.writeValue('two');
        expect(component.selectedValue).toEqual('two');
    });

    it('should set the value when the list options are objects', () => {
        component.listOpts = [{ id: 1, name: 'one' }, { id: 2, name: 'two' }, { id: 3, name: 'three' }];
        component.writeValue({ id: 2, name: 'two' });
        expect(component.selectedValue).toEqual({ id: 2, name: 'two' });
    });

    describe('When in readonly mode', () => {
        describe('and the otions are objects', () => {
            beforeEach(() => {
                component.readOnly = true;
                component.displayFieldName = 'theName';
                component.valueFieldName = 'identifier';
                component.listOpts = [{ identifier: 1, theName: 'one' }, { identifier: 2, theName: 'two' }, { identifier: 3, theName: 'three' }];
                component.selectedValue = 2;
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
                    const element = fixture.debugElement.query(By.css('select'));
                    expect(element).toBeNull();
                });
            });
        });

        describe('and the otions are primitives', () => {
            beforeEach(() => {
                component.readOnly = true;
                component.listOpts = ['uno', 'dos', 'tres'];
                component.selectedValue = 'dos';
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

    describe('single select mode', () => {
        it('should render the selected value', () => {
            component.listOpts = ['one', 'two', 'three'];
            component.writeValue('three');
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const element = fixture.debugElement.query(By.css('select')).nativeElement;
                expect(element.value).toBe('2: three');
            });
        });

        it('should make the select element disabled when the component is disabled', () => {
            component.disabled = true;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const inputElement: any = fixture.debugElement.nativeElement.querySelector('select');
                expect(inputElement).not.toBeNull();
                expect(inputElement.disabled).toBe(true);
            });
        });
    });
});
