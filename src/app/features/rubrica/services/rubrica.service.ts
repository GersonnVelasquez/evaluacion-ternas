import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Rubrica } from '../models/rubrica.model';

@Injectable({
  providedIn: 'root'
})
export class RubricaService {
  firestore: Firestore = inject(Firestore);

  async getRubrica(evaluacionId: number): Promise<Rubrica | null> {
    const rubricaCollection = collection(this.firestore, 'rubricas');
    const q = query(rubricaCollection, where('evaluacionId', '==', evaluacionId));
    const querySnapshot = await getDocs(q);
     if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return {
        evaluacionId: docData['evaluacionId'],
        criterios: docData['criterios'] || [],
        id: querySnapshot.docs[0].id,
      } as Rubrica;
    }
    return null;
  }

 async saveRubrica(rubrica: Rubrica): Promise<void> {
  const rubricaCollection = collection(this.firestore, 'rubricas');

  const q = query(rubricaCollection, where('evaluacionId', '==', rubrica.evaluacionId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const existingDocRef = doc(this.firestore, 'rubricas', querySnapshot.docs[0].id);
    await updateDoc(existingDocRef, { criterios: rubrica.criterios });
  } else {
    await addDoc(rubricaCollection, rubrica);
  }
}
}