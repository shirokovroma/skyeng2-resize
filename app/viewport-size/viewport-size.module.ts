import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './if-viewport-size.directive';
import { ViewportSizeService } from './viewport-size.service';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    IfViewportSizeDirective
  ],
  providers: [
    ViewportSizeService
  ]
})
export class ViewportSizeModule { }
