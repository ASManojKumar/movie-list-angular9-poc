import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { BookRoomModalComponent } from '../modal/book-room-modal/book-room-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ViewEventModalComponent } from '../modal/view-event-modal/view-event-modal.component';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BsModalService]
})

export class ViewMeetingsComponent implements OnInit {

  dayStartHour = 9;
  dayEndHour = 17;
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  city: any;

  meetingRooms = [{
    'name': 'London'
  }, {
    'name': 'Paris'
  }, {
    'name': 'Tokyo'
  }, {
    'name': 'Sydney'
  }, {
    'name': 'Madrid'
  }, {
    'name': 'Barcelona'
  }, {
    'name': 'New York'
  }, {
    'name': 'Mumbai'
  }, {
    'name': 'Tokyo'
  }, {
    'name': 'Bangalore'
  }];

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modalService: BsModalService) { }

  handleEvent(event): void {
    let modal = this.modalService.show(ViewEventModalComponent, { class: 'modal-md' });
    (<ViewEventModalComponent>modal.content).showConfirmationModal(
      event
    );
    (<ViewEventModalComponent>modal.content).onClose.subscribe(result => {
      if (result) {
      }
    });
  }

  // deleting an event
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // for booking a room
  openBookRoomModal(event) {
    let all_events = [...this.events];
    let selected_date = this.weekDays[event.date.getDay()];
    if (selected_date === 'Saturday' || selected_date === 'Sunday') {
      return;
    }
    let modal = this.modalService.show(BookRoomModalComponent, { class: 'modal-md' });
    (<BookRoomModalComponent>modal.content).showConfirmationModal(
      all_events
    );
    (<BookRoomModalComponent>modal.content).onClose.subscribe(data => {
      if (data) {
        this.refresh.next();
        this.events = [
          ...this.events,
          {
            title: data.title,
            start: data.start,
            end: data.end,
            meta: data.meta
          }
        ];
      }
    });
  }

  // reset applied room
  resetFilterSelection() {
    delete this.city;
  }

  ngOnInit() {
  }
}
