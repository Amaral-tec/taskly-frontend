import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar';
import { CommonModule } from '@angular/common';

import { CalendarRequestDTO } from '../../models/calendar.model';
import { RecurrenceType, recurrenceOptions } from '../../models/recurrence-type.enum';

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
export class CalendarForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CalendarForm>);
  private service = inject(CalendarService);

  eventForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    startDateTime: ['', Validators.required],
    endDateTime: [''],
    reminder: [''],
    recurrenceType: [RecurrenceType.NONE, Validators.required]
  });

  saveEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      const payload: CalendarRequestDTO = {
        title: formValue.title!,
        description: formValue.description || '',
        startDateTime: formValue.startDateTime!,
        endDateTime: formValue.endDateTime || '',
        reminder: formValue.reminder || '',
        recurrenceType: formValue.recurrenceType as RecurrenceType
      };

      this.service.create(payload).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  recurrenceOptions = recurrenceOptions;
}
