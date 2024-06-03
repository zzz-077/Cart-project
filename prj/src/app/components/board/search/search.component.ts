import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  switchMap,
} from 'rxjs';
import { setInterval } from 'timers/promises';
import {
  TimeInterval,
  timeInterval,
} from 'rxjs/internal/operators/timeInterval';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private searchTerms = new Subject<string>();
  private getPrevCards = new Subject<[number, number]>();
  constructor(private cardServ: CardsService) {
    this.searchTerms
      .pipe(
        debounceTime(500),
        switchMap((term) => (term.trim() ? this.cardServ.findCards(term) : []))
      )
      .subscribe((data) => {
        // console.log('works1:', data);
        if (data && data.length > 0) {
          this.cardServ.SearchedCardsObservable.next(data);
        } else if (data && data.length == 0) {
          this.cardServ.SearchedCardsObservable.next('notFound');
        }
      });

    this.getPrevCards
      .pipe(
        debounceTime(750),
        switchMap(([val1, val2]) => {
          return this.cardServ.getCards(val1, val2);
        })
      )
      .subscribe((data) => {
        // console.log('works2:', data);
        if (data && data.length > 0) {
          this.cardServ.SearchedCardsObservable.next(data);
        } else if (data && data.length == 0) {
          this.cardServ.SearchedCardsObservable.next('notFound');
        }
      });
  }
  isSearchClicked: boolean = false;
  searchTimeout: any;

  inputFunc(value: string) {
    clearTimeout(this.searchTimeout);

    if (value.trim() != '') {
      this.isSearchClicked = true;
      this.searchTerms.next(value);
    } else {
      this.searchTimeout = setTimeout(() => {
        this.isSearchClicked = false;
      }, 5000);
      var val1 = 0,
        val2 = 0;
      this.cardServ.newCards$.subscribe((data) => {
        if (data != null) {
          val1 = data?.a;
          val2 = data?.b;
        }
      });
      this.getPrevCards.next([val1, val2]);
    }
  }

  searchClicked() {
    this.isSearchClicked = true;
  }
  hideSearchBox() {
    this.isSearchClicked = false;
  }
}
