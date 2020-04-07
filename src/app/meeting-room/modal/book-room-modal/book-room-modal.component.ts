import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { addHours, startOfDay } from 'date-fns';
import { CalendarEventAction, CalendarEvent } from 'angular-calendar';

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

  public showConfirmationModal(): void {
  }

  events: CalendarEvent[] = [];

  checkTime() {
    // let start_time = this.meeting_form.data.start_time.toString(this.meeting_form.data.start_time.getHours() + this.meeting_form.data.start_time.getMinutes());
    // let end_time = this.meeting_form.data.end_time.getHours() + this.meeting_form.data.end_time.getMinutes();
    // // if (start_time && end_time) {
    // //   debugger
    // // }
    // let diff = 0;
    // if (start_time && end_time) {
    //   start_time = ConvertToSeconds(start_time);
    //   end_time = ConvertToSeconds(end_time);
    //   diff = Math.abs(end_time - start_time);
    //   console.log('time difference is : ' + secondsTohhmmss(diff));
    // }

    // function ConvertToSeconds(time) {
    //   var splitTime = time.split(":");
    //   return splitTime[0] * 3600 + splitTime[1] * 60;
    // }

    // function secondsTohhmmss(secs: number) {
    //   let hours = secs / 3600;
    //   var seconds = secs % 3600;
    //   var minutes = seconds / 60;
    //   return hours + "hours : " + minutes + "minutes ";
    // }
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
    this._bsModalRef.hide();
    let booking_details = {
      start: this.meeting_form.data.start,
      end: this.meeting_form.data.end,
      title: this.meeting_form.data.agenda,
      // actions: this.actions,
      meta: {
        'name': this.meeting_form.data.userName,
        'room': this.meeting_form.data.roomName,
        'date': this.meeting_form.data.date
      }
    }
    this.onClose.next(booking_details);
  }

  public onCancel() {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
