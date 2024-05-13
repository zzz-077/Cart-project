import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, from, map, of } from 'rxjs';
import { card } from '../../model/cardModel';
@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {}
  public cardsObservable = new BehaviorSubject<{}>({ a: 0, b: 5 });
  newCards$: Observable<any> = this.cardsObservable.asObservable();

  getCardsLength(): Observable<number | null> {
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((doc) => {
          if (!doc.empty) {
            return doc.docs.length;
          } else return null;
        })
      );
  }

  getCards(currCardFr: number, currCardTo: number): Observable<[] | null> {
    var cardData: any = [];
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((doc) => {
          if (!doc.empty) {
            doc.docs.forEach((obj, i) => {
              if (i >= currCardFr && i <= currCardTo) {
                let j = 0;
                cardData.push(obj.data());
                cardData[j] = {
                  ...cardData[j],
                  Id: obj.id,
                };
                j++;
              }
            });
            return cardData;
          } else return null;
        })
      );
  }

  setNewPage(a: number, b: number) {
    let obj = { a: a, b: b };
    this.cardsObservable.next(obj);
  }
}
