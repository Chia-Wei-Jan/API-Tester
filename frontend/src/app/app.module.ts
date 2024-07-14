import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddApiFormComponent } from './add-api-form/add-api-form.component';
import { ApiIntegrationComponent } from './api-integration/api-integration.component';

@NgModule({
  declarations: [
    AppComponent,
    AddApiFormComponent,
    ApiIntegrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
