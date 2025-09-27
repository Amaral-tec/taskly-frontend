import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarList } from './components/calendar-list/calendar-list';

const routes: Routes = [
  { path: '', component: CalendarList },
  { path: 'create', component: CalendarList },
  { path: ':publicId/edit', component: CalendarList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarModule { }
