import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'event', component: EventsComponent }]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
