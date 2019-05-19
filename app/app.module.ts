import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';

import { ViewportSizeModule } from './viewport-size/viewport-size.module'


@NgModule({
  imports:      [ BrowserModule, FormsModule, ViewportSizeModule ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [
    { provide: 'SIZE_CONFIG', useValue: { medium: 700, large: 1200 } }
  ],
})
export class AppModule { }
