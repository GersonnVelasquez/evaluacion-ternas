import { Routes } from '@angular/router';


export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'participantes',
        pathMatch: 'full'


    },
    {
        path: 'participantes',
        loadComponent: () => import('./features/participantes/components/participantes/participantes.component').then(m => m.ParticipantesComponent)
    }
];
