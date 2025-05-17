import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'evaluacion-ternas',
        appId: '1:391646671824:web:6dce9cf604d8a973e0bfd5',
        storageBucket: 'evaluacion-ternas.firebasestorage.app',
        apiKey: 'AIzaSyBoAATZVgLnCHKlqtaoJxcmJPdHEOJ2z98',
        authDomain: 'evaluacion-ternas.firebaseapp.com',
        messagingSenderId: '391646671824',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
