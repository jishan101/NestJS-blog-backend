import { sortBy, orderBy } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const sort = <T = any>(list: T[], keys?: Array<keyof T | string>) => {
  return sortBy(list, keys);
};

export const sort$ = (keys?: Array<string>) => {
  return <R>(source: Observable<R>) =>
    source.pipe(
      map((list) => {
        if (list instanceof Array) {
          return sort(list as any, keys);
        }
        return list;
      }),
    );
};

export const order = orderBy;
