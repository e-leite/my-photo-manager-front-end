import { Injectable } from '@angular/core';
import { Event } from './models/event.model';
import { EVENT_DATA } from './event-mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  getAll(): Observable<Event[]> {
    return of(EVENT_DATA);
  }

  getById(id: number): Observable<Event | undefined> {
    const findedEvent = EVENT_DATA.find((events) => events.id === id);
    if (findedEvent) {
      return of(findedEvent);
    }
    return of(undefined);
  }

  save(event: Event): void {
    const id = EVENT_DATA.length + 1;
    event.id = id;
    EVENT_DATA.push(event);
  }

  edit(event: Event): void {
    const editedEvent = EVENT_DATA.find((events) => events.id === event.id);
    if (editedEvent) {
      const editedEventIndex = EVENT_DATA.indexOf(editedEvent);
      EVENT_DATA.splice(editedEventIndex, 1, event);
    }
  }

  delete(id: number): Observable<Event | undefined> {
    const eventForDelete = EVENT_DATA.find((events) => events.id === id);
    if (eventForDelete) {
      const eventForDeleteIndex = EVENT_DATA.indexOf(eventForDelete);
      EVENT_DATA.splice(eventForDeleteIndex, 1);
      return of(eventForDelete);
    }
    return of(undefined);
  }
}
