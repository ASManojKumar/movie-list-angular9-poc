import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewMeetingsComponent } from './meeting-room/view-meetings/view-meetings.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BookRoomModalComponent } from './meeting-room/modal/book-room-modal/book-room-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewEventModalComponent } from './meeting-room/modal/view-event-modal/view-event-modal.component';
import { pipesModule } from './shared/pipes.module';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    ViewMeetingsComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    pipesModule.forRoot(),
    AlertModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BookRoomModalComponent, ViewEventModalComponent]
})
export class AppModule { }
