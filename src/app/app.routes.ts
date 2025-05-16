import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/components/home/home.component').then(
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
