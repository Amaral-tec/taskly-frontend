import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CalendarService } from '../../services/calendar';
import { CalendarRequestDTO, CalendarResponseDTO } from '../../models/calendar.model';
import { RecurrenceType, recurrenceOptions } from '../../models/recurrence-type.enum';

import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-calendar-form',
  standalone: true,
  templateUrl: './calendar-form.html',
  styleUrl: './calendar-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class CalendarForm implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CalendarForm>);
  private service = inject(CalendarService);
  private data = inject(MAT_DIALOG_DATA, { optional: true });

  eventForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    startDateTime: ['', Validators.required],
    endDateTime: ['', Validators.required],
    reminder: [''],
    recurrenceType: [RecurrenceType.NONE, Validators.required]
  });

  recurrenceOptions = recurrenceOptions;

  ngOnInit(): void {
    if (this.data?.publicId) {
      this.service.getById(this.data.publicId).subscribe({
        next: (event: CalendarResponseDTO) => {
          this.eventForm.patchValue({
            ...event,
            recurrenceType: event.recurrenceType as RecurrenceType
          });
        },
        error: (err) => console.error('Error loading event', err)
      });
    }
  }

  saveOrUpdateEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      const payload: CalendarRequestDTO = {
        title: formValue.title!,
        description: formValue.description || '',
        startDateTime: formValue.startDateTime!,
        endDateTime: formValue.endDateTime || '',
        reminder: formValue.reminder || '',
        recurrenceType: formValue.recurrenceType as RecurrenceType,
      };

      if (this.data?.publicId) {
        this.service.update(this.data.publicId, payload).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err),
        });
      } else {
        this.service.create(payload).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err),
        });
      }
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  get isEditMode(): boolean {
    return !!this.data?.publicId;
  }
}
