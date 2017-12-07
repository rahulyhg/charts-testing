import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MorphaticChartsModule } from '@morphatic/charts';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MorphaticChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
