import { AfFocusModule } from './../../../directives/af-focus.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AfNFPAFieldComponent } from './af-nfpa-field.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By, BrowserModule } from '@angular/platform-browser';

describe('AfNfpaFieldComponent', () => {
  let component: AfNFPAFieldComponent;
  let fixture: ComponentFixture<AfNFPAFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AfFocusModule        
      ],
      declarations: [AfNFPAFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfNFPAFieldComponent);
    component = fixture.componentInstance;
    component.writeValue({
      flamibility: 1,
      health: 2,
      instability: 3,
      special: 'ACID'
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      fixture.detectChanges();
    });

    it('should not render any select boxes', () => {
      const inputs = fixture.debugElement.queryAll(By.css('select'));
      expect(inputs.length).toBe(0);
    });

    it('should display the values', () => {
      expect(fixture.debugElement.query(By.css('.nfpa-flamibility')).nativeElement.textContent).toContain('1');
      expect(fixture.debugElement.query(By.css('.nfpa-health')).nativeElement.textContent).toContain('2');
      expect(fixture.debugElement.query(By.css('.nfpa-instability')).nativeElement.textContent).toContain('3');
      expect(fixture.debugElement.query(By.css('.nfpa-special')).nativeElement.textContent).toContain('ACID');
    });
  });

  describe('edit mode', () => {
    beforeEach(() => {
      component.readOnly = false;
      fixture.detectChanges();
    });

    it('should render four select boxes', () => {
      const inputs = fixture.debugElement.queryAll(By.css('select'));
      expect(inputs.length).toBe(4);
    });

    it('should have the expected values selected', () => {
      fixture.whenStable().then(() => {
        const flammibilitySelect = fixture.debugElement.query(By.css('.nfpa-flamibility select')).nativeElement;
        expect(flammibilitySelect.selectedOptions.length).toBe(1);
        expect(flammibilitySelect.selectedOptions[0].value).toBe('1');

        const healthSelect = fixture.debugElement.query(By.css('.nfpa-health select')).nativeElement;
        expect(healthSelect.selectedOptions.length).toBe(1);
        expect(healthSelect.selectedOptions[0].value).toBe('2');

        const instabilitySelect = fixture.debugElement.query(By.css('.nfpa-instability select')).nativeElement;
        expect(instabilitySelect.selectedOptions.length).toBe(1);
        expect(instabilitySelect.selectedOptions[0].value).toBe('3');

        const specialSelect = fixture.debugElement.query(By.css('.nfpa-special select')).nativeElement;
        expect(specialSelect.selectedOptions.length).toBe(1);
        expect(specialSelect.selectedOptions[0].value).toBe('ACID');
      });
    });
  });
});
