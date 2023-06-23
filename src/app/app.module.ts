import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsTableComponent } from './events-table/events-table.component';
import { EventsFormComponent } from './events-form/events-form.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { IbgeApiService } from './shared/ibge-api.service';
import { EventsService } from './shared/events.service';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, EventsTableComponent, EventsFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    IbgeApiService,
    EventsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
