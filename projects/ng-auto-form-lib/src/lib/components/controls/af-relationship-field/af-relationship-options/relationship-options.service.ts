import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export abstract class RelationshipOptionsService {
  abstract getOptions(filterValue: string, config: any): Observable<RelationshipOptions>;
}

export class RelationshipOptions {
  options: any[];
  resultsTruncated: boolean;
}

@Injectable()
export class RelationshipOptionsServiceDefault extends RelationshipOptionsService {

  allOptions = [];
  pageSize = 7;
  filterField = 'name';

  isEmptyFilter(filterValue: string) {
    return filterValue === null || filterValue === '' || filterValue === undefined;
  }

  getOptions(filterValue: string, config: any): Observable<RelationshipOptions> {
    const opts = this.isEmptyFilter(filterValue) ? config.allOptions :
      config.allOptions.filter(o => o[config.filterField].toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
    return Observable.create(o => o.next({
      options: opts,
      resultsTruncated: opts.length > config.pageSize
    })).pipe(delay(500));
  }
}
