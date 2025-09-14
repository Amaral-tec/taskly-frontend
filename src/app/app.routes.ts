import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'agenda',
        loadChildren: () => import('./modules/agenda/agenda-module').then(m => m.AgendaModule)
    },
    { path: '', redirectTo: '/agenda', pathMatch: 'full' },
    { path: '**', redirectTo: '/agenda' }
];
