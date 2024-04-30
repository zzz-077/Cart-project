import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { Observable, from, map, of } from 'rxjs';
import { card } from '../../model/cardModel';
@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}

  getCards(): Observable<[] | null> {
    var cardData: any = [];
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((doc) => {
          if (!doc.empty) {
            doc.docs.forEach((obj, i) => {
              cardData.push(obj.data());
              cardData[i] = {
                ...cardData[i],
                Id: obj.id,
              };
            });
            return cardData;
          } else return null;
        })
      );
  }
}
