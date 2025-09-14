import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarList } from './components/calendar-list/calendar-list';
import { CalendarForm } from './components/calendar-form/calendar-form';
import { CalendarDetail } from './components/calendar-detail/calendar-detail';

const routes: Routes = [
  { path: '', component: CalendarList },
  { path: 'new', component: CalendarForm }, 
  { path: ':id', component: CalendarDetail },
  { path: 'edit/:id', component: CalendarForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule {}
