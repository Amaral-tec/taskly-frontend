import { Component, OnInit, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CalendarForm } from '../calendar-form/calendar-form';
import { CalendarService } from '../../services/calendar';
import { CalendarResponseDTO } from '../../models/calendar.model';
import { StatusType, statusOptions } from '../../models/status-type.enum';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-calendar-list',
  standalone: true,
  templateUrl: './calendar-list.html',
  styleUrls: ['./calendar-list.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DatePipe,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class CalendarList implements OnInit, AfterViewInit {
  private service = inject(CalendarService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<CalendarResponseDTO>([]);
  StatusType = StatusType;
  statusOptions = Object.values(StatusType);

  events: CalendarResponseDTO[] = [];
  displayedColumns = ['title', 'dates', 'status', 'actions'];

  filterForm: FormGroup;

  constructor() {
    this.filterForm = this.fb.group({
      title: [''],
      status: [[]],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.setDefaultFilters();
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setDefaultFilters(): void {
    const defaultStatuses = this.statusOptions.filter(
      s => s !== StatusType.CANCELED && s !== StatusType.COMPLETED
    );

    this.filterForm.patchValue({
      title: '',
      status: defaultStatuses,
      startDate: '',
      endDate: ''
    });
  }

  loadEvents() {
    this.service.getAll().subscribe({
      next: (res) => (this.dataSource.data = res),
      error: (err) => console.error('Error loading events', err)
    });
  }

  applyFilters(): void {
    const filters = this.filterForm.value;
    this.service.search(filters).subscribe({
      next: (res) => (this.dataSource.data = res),
      error: (err) => console.error('Error applying filters', err)
    });
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.loadEvents();
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
