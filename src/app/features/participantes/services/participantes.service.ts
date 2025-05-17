import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Participante } from '../models/participante.model';

@Injectable({ providedIn: 'root' })
export class ParticipantesService {
  firestore = inject(Firestore);

  getParticipantes() {
    const participanteCollection = collection(this.firestore, 'participantes');

    return collectionData(participanteCollection, { idField: 'uuid' });

  }

  getParticipante(id: string) {
    const participanteDoc = doc(this.firestore, 'participantes', id);
    return getDoc(participanteDoc);
  }

  addParticipante(participante: Participante) {
    const participanteCollection = collection(this.firestore, 'participantes');
    return addDoc(participanteCollection, participante);
  }

  updateParticipante(participante: Participante) {
    const participanteCollection = collection(this.firestore, 'participantes');
    const participanteDoc = doc(participanteCollection,participante.uuid);
    return updateDoc(participanteDoc, { ...participante });
  }

  deleteParticipante(participante: Participante) {
    const participanteCollection = collection(this.firestore, 'participantes');
    const participanteDoc = doc(participanteCollection, participante.uuid);
    return deleteDoc(participanteDoc);
  }
}
