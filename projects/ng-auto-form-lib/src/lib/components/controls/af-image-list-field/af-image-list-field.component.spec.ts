import { AfImageListFieldModule } from './af-image-list-field.module';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgControl, AbstractControl } from '@angular/forms';
import { AfImageListFieldComponent } from './af-image-list-field.component';

class MockNgControl extends NgControl {
  control: AbstractControl;
  viewToModelUpdate(newValue: any): void { }
}

describe('AfImageListFieldComponent', () => {
  let component: AfImageListFieldComponent;
  let fixture: ComponentFixture<AfImageListFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AfImageListFieldModule
      ],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfImageListFieldComponent);
    component = fixture.componentInstance;
    component.selectedValue = ['GHS01: Explosive'];
    component.imageOptions = [
      { value: 'GHS01: Explosive', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/GHS-pictogram-explos.svg' },
      { value: 'GHS02: Flammable', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/GHS-pictogram-flamme.svg' },
      { value: 'GHS03: Oxidizing', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/GHS-pictogram-rondflam.svg' }
    ];
    fixture.detectChanges();
  });

  it('should show the selected option', () => {
    const selectedImages = fixture.debugElement.queryAll(By.css('.selected-value'));
    expect(selectedImages.length).toBe(1);
    expect(selectedImages[0].nativeElement.src).toBe(component.imageOptions[0].imageUrl);
  });

  it('clicking a selected value should remove it from the list of selected values', () => {
    const firstSelectedImage = fixture.debugElement.query(By.css('.selected-value'));
    firstSelectedImage.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const selectedValues = fixture.debugElement.queryAll(By.css('.selected-value'));
      expect(selectedValues.length).toBe(0);
    });
  });

  it('clicking a button should display the image options', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn).not.toBeNull();
    btn.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const optionElements = fixture.debugElement.queryAll(By.css('.option'));
      expect(optionElements.length).toBe(2);
    });
  });

  it('clicking an image option should add it to the list of selected values and remove it from the list of selectable options (single select)', () => {
    component.showOptionsPane = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstOptionElement = fixture.debugElement.query(By.css('.option'));
      firstOptionElement.nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const selectedImages = fixture.debugElement.queryAll(By.css('.selected-value'));
        expect(selectedImages.length).toBe(1);
        expect(selectedImages[1].nativeElement.src).toBe(component.imageOptions[1].imageUrl);
        const optionElements = fixture.debugElement.queryAll(By.css('.option'));
        expect(optionElements.length).toBe(2);
      });
    });
  });

  it('clicking an image option should add it to the list of selected values and remove it from the list of selectable options  (multi select)', () => {
    component.showOptionsPane = true;
    component.isMultiple = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstOptionElement = fixture.debugElement.query(By.css('.option'));
      firstOptionElement.nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const selectedImages = fixture.debugElement.queryAll(By.css('.selected-value'));
        expect(selectedImages.length).toBe(2);
        expect(selectedImages[1].nativeElement.src).toBe(component.imageOptions[1].imageUrl);
        const optionElements = fixture.debugElement.queryAll(By.css('.option'));
        expect(optionElements.length).toBe(1);
      });
    });
  });

  describe('when in readonly mode', () => {
    beforeEach(() => {
      component.readOnly = true;
      fixture.detectChanges();
    });

    it('should not display a button', () => {
      fixture.whenStable().then(() => {
        const originalValueLength = component.selectedValue.length;
        const selectedImage = fixture.debugElement.query(By.css('.selected-value'));
        selectedImage.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.selectedValue.length).toBe(originalValueLength);
        });
      });
    });

    it('should not remove selected items when clicked on', () => {
      fixture.whenStable().then(() => {

      });
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      component.setDisabledState(true);
      fixture.detectChanges();
    });

    it('should disable the button', () => {
      fixture.whenStable().then(() => {
        const btn = fixture.debugElement.query(By.css('button'));
        expect(btn.nativeElement.disabled).toBe(true);
      });
    });

    it('should not make the images look clickable', () => {
      const selectedImages = fixture.debugElement.queryAll(By.css('.selected-value'));
      selectedImages.forEach(selectedImg => {
        expect(selectedImg.nativeElement.class).not.toContain('clickable');
      });
    });
  });
});
