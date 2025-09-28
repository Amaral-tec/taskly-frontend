import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { CalendarForm } from '../calendar-form/calendar-form';
import { CalendarService } from '../../services/calendar';
import { CalendarResponseDTO } from '../../models/calendar.model';
import { StatusType } from '../../models/status-type.enum';

import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-list',
  standalone: true,
  templateUrl: './calendar-list.html',
  styleUrls: ['./calendar-list.scss'],
  imports: [
    CommonModule, 
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CalendarList implements OnInit {
  private service = inject(CalendarService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  StatusType = StatusType;

  events: CalendarResponseDTO[] = [];
  displayedColumns = ['title', 'dates', 'status', 'actions'];

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.service.getAll().subscribe({
      next: (res) => (this.events = res),
      error: (err) => console.error('Error loading events', err)
    });
  }

  createEvent() {
    const dialogRef = this.dialog.open(CalendarForm, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadEvents();
    });
  }

  editEvent(publicId: string) {
    const dialogRef = this.dialog.open(CalendarForm, {
      width: '600px',
      data: { publicId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadEvents();
    });
  }

  updateStatus(publicId: string, status: StatusType) {
    this.service.updateStatus(publicId, status).subscribe(() => this.loadEvents());
  }

  deleteEvent(publicId: string) {
    this.service.delete(publicId).subscribe(() => this.loadEvents());
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
