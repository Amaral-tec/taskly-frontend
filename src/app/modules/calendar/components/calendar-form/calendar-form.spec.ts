import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarForm } from './calendar-form';

describe('CalendarForm', () => {
  let component: CalendarForm;
  let fixture: ComponentFixture<CalendarForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
