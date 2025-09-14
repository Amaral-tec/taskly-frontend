import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar';
import { CalendarResponseDTO, CalendarRequestDTO } from '../../models/calendar.model';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.html'
})
export class CalendarList implements OnInit {
  calendars: CalendarResponseDTO[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadCalendars();
  }

  loadCalendars(): void {
    this.calendarService.getAll().subscribe({
      next: (data) => this.calendars = data,
      error: (err) => console.error('Erro ao carregar agendas', err)
    });
  }
}
