import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html',
  styleUrls: ['./view-event-modal.component.scss']
})
export class ViewEventModalComponent {
  view_event_details: any;
  public onClose: Subject<any>;

  constructor(private _bsModalRef: BsModalRef) {
    this.view_event_details = {}
  }

  public ngOnInit() {
    this.onClose = new Subject();
  }

  public showConfirmationModal(body: any, events): void {

    this.view_event_details.data = body;
  }

  public submitForm() {
    this._bsModalRef.hide();
    this.onClose.next(true);
  }

  public onCancel() {
    this.onClose.next(false);
    this._bsModalRef.hide();
  }
}
