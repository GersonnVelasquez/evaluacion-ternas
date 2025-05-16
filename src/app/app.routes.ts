import { Routes } from '@angular/router';

export const routes: Routes = [
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
   {
    path: 'rubrica',
    loadComponent: () =>
      import(
        './features/rubrica/components/rubrica/rubrica.component'
      ).then((m) => m.RubricaComponent),
  },
];
