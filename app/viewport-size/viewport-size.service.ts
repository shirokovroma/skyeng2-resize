import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { IConfig } from './config.interface';



@Injectable()
export class ViewportSizeService {

  size$: Observable<string>;

  constructor(@Inject('SIZE_CONFIG') config: IConfig) { 
    console.log('config', config);
    this.size$ = Observable.fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        startWith(null),
        map(this.getSize), 
        distinctUntilChanged()
      );
  }
  getSize() {
    if( window.innerWidth < 600 ){
      return 'small';
    } else if( window.innerWidth > 1200) {
      return 'large';
    }
    return 'medium';
  }
}
