import { Component, forwardRef, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject, Subscription, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, flatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'af-relationship-field',
  templateUrl: './af-relationship-field.component.html',
  styleUrls: ['./af-relationship-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AfRelationshipFieldComponent),
    }
  ]
})
export class AfRelationshipFieldComponent implements ControlValueAccessor {
  @Input() readOnly = false;
  @Input() displayNameField = 'name';
  @Input() relationshipServiceConfig: any;
  @Input() focus = false;

  innerValue = null;
  filterValue = '';
  disabled = false;
  displayOptionsPanel = false;
  waiting = false;
  keyUp = new Subject<any>();
  searchSubscription: Subscription;

  constructor(private elementRef: ElementRef) {
    this.keyUp
      .pipe(map(event => {
        if (this.searchSubscription) {
          this.searchSubscription.unsubscribe();
        }
        return event.target.value;
      }))
      .pipe(debounceTime(650))
      .pipe(distinctUntilChanged())
      .pipe(flatMap(search => Observable.create(o => o.next(search))))
      .pipe(delay(300))
      .subscribe((search: string) => {
        this.filterValue = search;
      });
  }

  getReadOnlyDisplayValue(value: any): string {
    return value ? value[this.displayNameField] : null;
  }

  toggleOptions(): void {
    this.displayOptionsPanel = !this.displayOptionsPanel;
  }

  select(option: any) {
    this.filterValue = '';
    this.writeValue(option);
    this.onChangeCallback(this.innerValue);
    this.displayOptionsPanel = false;
  }

  writeValue(value: any) {
    this.innerValue = value;
  }

  updateFilterValue(newFilterValue: string) {
    this.filterValue = newFilterValue;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  showRelationshipOptions() {
    this.displayOptionsPanel = true;
  }

  stopWaiting() {
    setTimeout(() => {
      this.waiting = false;
    });
  }

  startWaiting() {
    setTimeout(() => {
      this.waiting = true;
    });
  }

  @HostListener('document:click', ['$event'])
  documentClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.displayOptionsPanel = false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode !== 9) { // ignore tab!
      this.displayOptionsPanel = true;
    }
  }

  /** Unsed, but here to statisfy interface */
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };
}
