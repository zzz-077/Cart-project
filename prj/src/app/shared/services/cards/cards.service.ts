import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, catchError, from, map, of } from 'rxjs';
import { card } from '../../model/cardModel';
import e from 'express';
import { error } from 'console';
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

  public SearchedCardsObservable = new BehaviorSubject<{}>({});
  searchedCards$: Observable<any> = this.SearchedCardsObservable.asObservable();

  getCardsLength(): Observable<number | null> {
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((doc) => {
          if (!doc.empty) {
            return doc.docs.length;
          } else throw new Error('No document found!');
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }

  getCards(currCardFr: number, currCardTo: number): Observable<any[] | null> {
    let cardData: any[] = [];
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
          } else throw new Error('No cards Found!');
        })
      );
  }

  setNewPage(a: number, b: number) {
    let obj = { a: a, b: b };
    this.cardsObservable.next(obj);
  }

  findCards(value: string): Observable<any[] | null> {
    let filteredArr: any[] = [];
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((doc) => {
          if (!doc.empty) {
            let docs = doc.docs;

            docs
              .map((obj) => obj.data() as card)
              .filter((card) =>
                card.Name.toLowerCase().includes(value.toLowerCase())
              )
              .forEach((filteredCards) => filteredArr.push(filteredCards));

            return filteredArr;
          } else throw new Error('No cards found!');
        })
      );
  }
}
