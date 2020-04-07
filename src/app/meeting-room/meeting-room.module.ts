import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ViewEventModalComponent } from './modal/view-event-modal/view-event-modal.component';
import { BookRoomModalComponent } from './modal/book-room-modal/book-room-modal.component';

@NgModule({
  declarations: [BookRoomModalComponent, ViewEventModalComponent],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class MeetingRoomModule { }
