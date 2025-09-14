import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDetail } from './calendar-detail';

describe('CalendarDetail', () => {
  let component: CalendarDetail;
  let fixture: ComponentFixture<CalendarDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
