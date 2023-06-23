import { Injectable } from '@angular/core';
import { Event } from './models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  submitEventForm(event: Event): void {
    console.log(event);
  }
}
