import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : '',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'evaluadores',
    loadComponent: () =>
      import(
        './features/evaluadores/components/evaluadores/evaluadores.component'
      ),
  },
  {
    path: 'participantes',
    loadComponent: () =>
      import(
        './features/participantes/components/participantes/participantes.component'
      ).then((m) => m.ParticipantesComponent),
  },


];
