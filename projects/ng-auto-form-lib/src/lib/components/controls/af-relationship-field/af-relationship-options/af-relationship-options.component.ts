import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { RelationshipOptionsService } from './relationship-options.service';

@Component({
  selector: 'af-relationship-options',
  templateUrl: './af-relationship-options.component.html',
  styleUrls: ['./af-relationship-options.component.css']
})
export class AfRelationshipOptionsComponent implements OnInit, OnChanges {

  @Input() displayNameField = 'name';
  @Input() relationshipServiceConfig: any;
  @Input() filterValue = '';

  @Output() optionSelected = new EventEmitter<any>();
  @Output() waiting = new EventEmitter<void>();
  @Output() waitingStop = new EventEmitter<void>();

  options: any[] = [];
  truncated = false;

  constructor(private relationshipOptionsService: RelationshipOptionsService) {
  }

  ngOnInit() {
    this.filterValue = '';
    this.newSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterValue) {
      this.newSearch();
    }
  }

  reset(): void {
    this.options = [];
  }

  newSearch(): void {
    this.reset();
    this.loadMoreOptions();
  }

  loadMoreOptions() {
    this.waiting.emit();
    this.relationshipOptionsService.getOptions(this.filterValue, this.relationshipServiceConfig).subscribe(results => {
      this.options = results.options;
      this.truncated = results.resultsTruncated;
      this.checkForSingleOption();
    });
  }

  checkForSingleOption(): void {
    if (this.filterValue && this.options.length === 1) {
      this.select(this.options[0]);
    }
  }

  getOptionDisplayName(option: any) {
    return option[this.displayNameField];
  }

  select(selectedOption: any) {
    this.optionSelected.emit(selectedOption);
  }
}
