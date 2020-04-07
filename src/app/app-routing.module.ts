import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewMeetingsComponent } from './meeting-room/view-meetings/view-meetings.component';
import { BookRoomModalComponent } from './meeting-room/modal/book-room-modal/book-room-modal.component';
import { ViewEventModalComponent } from './meeting-room/modal/view-event-modal/view-event-modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'meeting-room', pathMatch: 'full' },
  {
    path: 'meeting-room',
    component: ViewMeetingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  ViewMeetingsComponent,
  BookRoomModalComponent,
  ViewEventModalComponent
];