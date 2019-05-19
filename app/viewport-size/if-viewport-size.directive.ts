import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, distinctUntilChanged, map } from 'rxjs/operators';
import { ViewportSizeService } from './viewport-size.service';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnInit, OnDestroy{

  windowSize: string;
  elementSize: string;
  destroy$: Subject<null>;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private zone: NgZone,
    private viewportSizeService: ViewportSizeService
  ) {
    this.destroy$ = new Subject();

    this.zone.runOutsideAngular(() => {
      viewportSizeService.size$
        .pipe(takeUntil(this.destroy$))
          .subscribe((size) => {
            this.onSizeChange(size);
          }, 
          (error) => {
            console.warn('error', error);
          },
          () => {});
      });
  }

  @Input()
  set ifViewportSize(val: string) {
    this.elementSize = val;
  }
  ngOnInit() {
    this.onSizeChange(this.viewportSizeService.getSize())
  }
  ngOnDestroy () {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onSizeChange(size: string) {
    if( this.elementSize === size ) {
      this.zone.run(() => this.viewContainer.createEmbeddedView(this.templateRef));
    } else {
      this.zone.run(() => this.viewContainer.clear());
    }
  }
}
