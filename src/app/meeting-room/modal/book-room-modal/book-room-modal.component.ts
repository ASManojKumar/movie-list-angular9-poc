import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-book-room-modal',
  templateUrl: './book-room-modal.component.html',
  styleUrls: ['./book-room-modal.component.scss']
})
export class BookRoomModalComponent {
  meeting_form: any;
  public onClose: Subject<any>;
  min_date: Date = new Date();
  minute_step = 15;
  min_time: Date = new Date();
  max_time: Date = new Date();
  all_events: any;

  constructor(private _bsModalRef: BsModalRef) {
    this.meeting_form = {
      'data': {
        'start': new Date(),
        'end': new Date()
      },
      // 'current_time': new Date(),
      'room_name_details': [{
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
      }]
    };
    this.min_time.setHours(9);
    this.min_time.setMinutes(0);
    this.max_time.setHours(17);
    this.max_time.setMinutes(59);
  }

  public ngOnInit() {
    this.onClose = new Subject();
  }

  public showConfirmationModal(events: any): void {
    this.all_events = [...events];
  }

  events: CalendarEvent[] = [];

  // for checking whether room is available or already used
  checkTime() {
    this.all_events.forEach(data => {
      if (data && data.start.getDate() === this.meeting_form.data.date.getDate() && data.meta.room.name === this.meeting_form.data.roomName.name) {
        let start_time_milli = data.start.getTime();
        let end_time_milli = data.end.getTime();
        let start_time_check_milli = this.meeting_form.data.start.getTime();
        let end_time_check_milli = this.meeting_form.data.end.getTime();
        if ((start_time_check_milli <= start_time_milli || start_time_check_milli <= end_time_milli) || (end_time_check_milli <= start_time_milli || end_time_check_milli <= end_time_milli)) {
          this.meeting_form.meeting_room_not_available = true;
        } else {
          this.meeting_form.meeting_room_not_available = false;
        }
      }
    });
  }

  getStartTimeEndTimeAccordingtoDate() {
    // setting start date and start time
    this.meeting_form.data.start.setDate(this.meeting_form.data.date.getDate());
    this.meeting_form.data.start.setHours(this.meeting_form.start_time.getHours());
    this.meeting_form.data.start.setMinutes(this.meeting_form.start_time.getMinutes());
    // setting end date and end time
    this.meeting_form.data.end.setDate(this.meeting_form.data.date.getDate());
    this.meeting_form.data.end.setHours(this.meeting_form.end_time.getHours());
    this.meeting_form.data.end.setMinutes(this.meeting_form.end_time.getMinutes());
  }

  public submitForm() {
    this.getStartTimeEndTimeAccordingtoDate();
    this.checkTime();
    if (!this.meeting_form.meeting_room_not_available) {
      this._bsModalRef.hide();
      let booking_details = {
        start: this.meeting_form.data.start,
        end: this.meeting_form.data.end,
        title: this.meeting_form.data.agenda,
        meta: {
          'name': this.meeting_form.data.userName,
          'room': this.meeting_form.data.roomName,
          'date': this.meeting_form.data.date
        }
      }
      this.onClose.next(booking_details);
    }
  }

  public onCancel() {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
