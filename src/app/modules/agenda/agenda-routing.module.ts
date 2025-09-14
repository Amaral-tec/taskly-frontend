import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaList } from './components/agenda-list/agenda-list';
import { AgendaForm } from './components/agenda-form/agenda-form';
import { AgendaDetail } from './components/agenda-detail/agenda-detail';

const routes: Routes = [
  { path: '', component: AgendaList },
  { path: 'new', component: AgendaForm }, 
  { path: ':id', component: AgendaDetail },
  { path: 'edit/:id', component: AgendaForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule {}
