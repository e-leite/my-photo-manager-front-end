import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventsFormComponent } from '../events-form/events-form.component';
import { Event } from '../shared/models/event.model';
import { EventsService } from '../shared/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
})
export class EventsTableComponent implements AfterViewInit, OnInit {
  constructor(public dialog: MatDialog, private eventsService: EventsService) {}
  displayedColumns: string[] = [
    'urlImage',
    'name',
    'startDate',
    'endDate',
    'place',
    'city',
    'state',
    'progressStatus',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<Event>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getEvent();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public openNewForm(): void {
    this.dialog
      .open(EventsFormComponent, {
        position: { right: '0' },
      })
      .afterClosed()
      .subscribe(() => {
        this.getEvent();
      });
  }

  public openEditForm(event: Event): void {
    this.dialog
      .open(EventsFormComponent, {
        position: { right: '0' },
        data: event,
      })
      .afterClosed()
      .subscribe(() => {
        this.getEvent();
      });
  }

  public deleteEvent(id: number): void {
    this.eventsService.delete(id).subscribe(() => {
      this.getEvent();
    });
  }

  private getEvent(): void {
    this.eventsService.getAll().subscribe((event) => {
      this.dataSource.data = event;
    });
  }
}
