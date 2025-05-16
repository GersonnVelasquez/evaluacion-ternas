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
        projectId: 'ejercicio-clase-618ae',
        appId: '1:622452255772:web:54c0d7fd7825e81a34c3d9',
        storageBucket: 'ejercicio-clase-618ae.firebasestorage.app',
        apiKey: 'AIzaSyA4uWAFjJqkBlSZc7y1rZMah_XUT7Rp1AQ',
        authDomain: 'ejercicio-clase-618ae.firebaseapp.com',
        messagingSenderId: '622452255772',
        measurementId: 'G-TYZP6LK468',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};

