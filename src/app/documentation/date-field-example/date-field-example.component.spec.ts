import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFieldExampleComponent } from './date-field-example.component';

describe('DateFieldExampleComponent', () => {
  let component: DateFieldExampleComponent;
  let fixture: ComponentFixture<DateFieldExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFieldExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFieldExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
