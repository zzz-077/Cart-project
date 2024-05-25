import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { debounceTime } from 'rxjs';
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
  constructor(private cardServ: CardsService) {}
  isSearchClicked: boolean = false;
  searchTimeout: any;

  inputFunc(value: string) {
    clearTimeout(this.searchTimeout);

    if (value.trim() != '') {
      this.isSearchClicked = true;
      this.cardServ.findCards(value).subscribe((data) => {
        if (data != null && data.length != 0) {
          this.cardServ.SearchedCardsObservable.next(data);
        } else {
          this.cardServ.SearchedCardsObservable.next(null);
        }
      });
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
      this.cardServ.getCards(val1, val2).subscribe((data) => {
        this.cardServ.SearchedCardsObservable.next(data);
      });
    }
  }
  searchClicked() {
    this.isSearchClicked = true;
  }
}
