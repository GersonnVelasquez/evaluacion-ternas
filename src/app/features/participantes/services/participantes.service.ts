import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';
import { Participante } from '../models/participante.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParticipantesService {
  firestore = inject(Firestore);

  getParticipantes() : Observable<Participante[]> {
    const participanteCollection = collection(this.firestore, 'participantes');
    return collectionData(participanteCollection, { idField: 'uuid' }) as Observable<Participante[]>;
  }

  

  addParticipante(participante: Participante) {
    const participanteCollection = collection(this.firestore, 'participantes');
    return addDoc(participanteCollection, participante);
  }

}