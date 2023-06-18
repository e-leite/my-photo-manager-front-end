import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-events',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
})
export class EventsTableComponent implements AfterViewInit, OnInit {
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
  dataSource = new MatTableDataSource<Event>(EVENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      EVENT_DATA.push({
        id: 1,
        name:
          Math.random().toString(36) +
          ' ' +
          Math.random().toString(36) +
          ' ' +
          Math.random().toString(36),
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        place: 'Parque de exposições',
        city: 'Maringá',
        state: 'PR',
        progressStatus: 'em andamento',
        status: 'ativo',
        urlImage: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      });
    }
    console.log(EVENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Event {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  place: string;
  city: string;
  state: string;
  progressStatus: string;
  status: string;
  urlImage: string;
}

const EVENT_DATA: Event[] = [];
