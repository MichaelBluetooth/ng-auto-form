import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationshipFieldExampleService {
  
  constructor(private http: HttpClient) {
  }

  getOptions(filterValue: string, config: any): Observable<any> {
    return this.http.get(config.apiUrl)
      .pipe(map(resp => resp['teams']))
      .pipe(map(teams => {
        const opts = this.isEmptyFilter(filterValue) ? teams :
          teams.filter(team => {
            return team[config.filterField].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
          });

        return {
          options: opts.slice(0, config.pageSize),
          resultsTruncated: opts.length > config.pageSize
        };
      }));
  }

  isEmptyFilter(filterValue: string) {
    return filterValue === null || filterValue === '' || filterValue === undefined;
  }
}
