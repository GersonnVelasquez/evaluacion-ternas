import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Evaluador } from '../models/evaluador.model';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EvaluadoresService {
  firestore: Firestore = inject(Firestore);

  getEvaluadores(): Observable<Evaluador[]> {
    const evaluadoresCollection = collection(this.firestore, 'evaluadores');
    return collectionData(evaluadoresCollection, { idField: 'id' }) as Observable<Evaluador[]>;
  }

  addEvaluador(evaluador: Evaluador){
   const evaluadoresCollection = collection(this.firestore, 'evaluadores');
    return addDoc(evaluadoresCollection, evaluador)
  }
}
