import { AfFocusModule } from './../../../directives/af-focus.module';
import { Directive, Output, Input, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfRelationshipFieldComponent } from './af-relationship-field.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'af-relationship-options'
})
class MockRelationshipOptionsDirective {
    @Input() displayNameField = 'name';
    @Input() relationshipServiceConfig: any;
    @Input() throttle = 300;
    @Input() scrollDistance = 2;
    @Input() filterValue = '';
    @Output() optionSelected = new EventEmitter<any>();
}

describe('AfRelationshipFieldComponent', () => {
    let component: AfRelationshipFieldComponent;
    let fixture: ComponentFixture<AfRelationshipFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AfFocusModule
            ],
            declarations: [
                AfRelationshipFieldComponent,
                MockRelationshipOptionsDirective
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AfRelationshipFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('When in readonly mode', () => {
        const dummyValue = { nodeName: 'This is the node name', name: 'This is the name', other: 'this is some other field' };

        beforeEach(() => {
            component.displayNameField = 'nodeName';
            component.readOnly = true;
            component.writeValue(dummyValue);
            fixture.detectChanges();
        });

        it('should display the selected value using the display name field', () => {
            fixture.whenStable().then(() => {
                const divElement = fixture.debugElement.query(By.css('div'));
                expect(divElement).not.toBeNull();
                expect(divElement.nativeElement.textContent).toContain(dummyValue.nodeName);
            });
        });
    });

    describe('When in edit mode', () => {
        const dummyValue = { nodeName: 'This is the node name', name: 'This is the name', other: 'this is some other field' };
        const dummyConfig = { allOptions: [] };

        beforeEach(() => {
            component.displayNameField = 'nodeName';
            component.readOnly = false;
            component.relationshipServiceConfig = dummyConfig;
            component.writeValue(dummyValue);
            fixture.detectChanges();
        });

        it('should show an input with the value text', () => {
            fixture.whenStable().then(() => {
                const inputElement = fixture.debugElement.query(By.css('input'));
                expect(inputElement).not.toBeNull();
                expect(inputElement.nativeElement.value).toContain('This is the node name');
            });
        });

        it('should update the filter value when someone types into it', () => {
            fixture.whenStable().then(() => {
                const newValue = 'This is new filter text';
                const inputElement = fixture.debugElement.query(By.css('input'));
                inputElement.nativeElement.value = newValue;
                inputElement.nativeElement.dispatchEvent('Input');
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(component.filterValue).toBe(newValue);
                });
            });
        });

        it('should display the options panel when the input is focused', () => {
            const inputElement = fixture.debugElement.query(By.css('input'));
            inputElement.nativeElement.dispatchEvent(new Event('focus'));
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(fixture.debugElement.query(By.directive(MockRelationshipOptionsDirective))).not.toBeNull();
            });
        });

        it('should accept new values from the options panel and clear the filter value', () => {
            let inputBtn = fixture.debugElement.query(By.css('input'));
            inputBtn.nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const dummyNewValue = {
                    nodeName: 'This is the new node name',
                    name: 'This is the new name',
                    other: 'this is some other new field'
                };
                const optionsPanelElement = fixture.debugElement.query(By.directive(MockRelationshipOptionsDirective));
                const optionsPanel = optionsPanelElement.injector.get(MockRelationshipOptionsDirective) as MockRelationshipOptionsDirective;
                optionsPanel.optionSelected.emit(dummyNewValue);
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    inputBtn = fixture.debugElement.query(By.css('input'));
                    expect(inputBtn.nativeElement.value).toContain(dummyNewValue.nodeName);
                    expect(component.filterValue).toBe('');
                });
            });
        });
    });

    describe('When disabled', () => {
        beforeEach(() => {
            component.setDisabledState(true);
            fixture.detectChanges();
        });

        it('should not allow users to click the button', () => {
            fixture.whenStable().then(() => {
                const inputBtn = fixture.debugElement.query(By.css('input'));
                expect(inputBtn.nativeElement.disabled).toBe(true);
                inputBtn.nativeElement.click();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    const relationshipOptionsPanel = fixture.debugElement.query(By.css('af-relationship-options'));
                    expect(relationshipOptionsPanel).toBeNull();
                });
            });
        });
    });
});
