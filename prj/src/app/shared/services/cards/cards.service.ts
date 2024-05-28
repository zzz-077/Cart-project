import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFirestore,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import {
  BehaviorSubject,
  Observable,
  catchError,
  empty,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
} from 'rxjs';
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

  public SearchedCardsObservable = new BehaviorSubject<any>(null || '');
  searchedCards$: Observable<any> = this.SearchedCardsObservable.asObservable();

  public CartAnimationObservable = new BehaviorSubject<boolean>(false);
  cartAnimation$: Observable<any> = this.CartAnimationObservable.asObservable();

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
    return this.firestore
      .collection('cards', (ref) =>
        ref
          .orderBy('Index')
          .startAfter(currCardFr - 1)
          .limit(6)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          if (actions.length > 0) {
            return actions.map((a) => {
              const data = a.payload.doc.data() as card;
              const id = a.payload.doc.id;
              return { ...data, Id: id };
            });
          } else {
            throw new Error('No cards Found!');
          }
        })
      );
  }

  getAllCards(): Observable<card[] | null> {
    var cardsArr: card[] = [];
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        map((obj) => {
          if (!obj.empty) {
            obj.forEach((doc) => {
              var data = doc.data() as card;
              data = {
                ...data,
                Id: doc.id,
              };
            });
            return cardsArr;
          } else {
            throw new Error('No cards Found!');
          }
        })
      );
  }
  /*
  updateDocument(): Observable<any> {
    return this.firestore
      .collection('cards')
      .get()
      .pipe(
        mergeMap((querySnapshot) => {
          const updateObservables: Observable<any>[] = [];
          let index = -1;
          const date = new Date();

          if (!querySnapshot.empty) {
            querySnapshot.docs.forEach((doc) => {
              const dd = doc.data() as Object;
              index++;
              const updatePromise = this.firestore
                .collection('cards')
                .doc(doc.id)
                .update({
                  ...dd,
                  SelectedQuantity: 1,
                });
            });
          }
          return forkJoin(updateObservables);
        })
      );
  }
*/

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
              .map((obj) => {
                var card = obj.data() as card;
                return (card = {
                  ...card,
                  Id: obj.id,
                });
              })
              .filter((card) =>
                card.Name.toLowerCase().includes(value.toLowerCase())
              )
              .forEach((filteredCards) => {
                filteredCards = {
                  ...filteredCards,
                  Id: filteredCards.Id,
                };
                filteredArr.push(filteredCards);
              });
            return filteredArr;
          } else throw new Error('No cards found!');
        })
      );
  }
}
