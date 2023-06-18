import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsTableComponent } from './events-table/events-table.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([{ path: 'event', component: EventsTableComponent }]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
