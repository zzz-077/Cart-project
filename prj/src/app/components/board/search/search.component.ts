import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  constructor(private cardServ: CardsService) {}

  inputFunc(value: string) {
    if (value.trim() != '') {
      this.cardServ.findCards(value).subscribe((data) => {
        if (data != null && data.length != 0) {
          this.cardServ.SearchedCardsObservable.next(data);
        } else {
          this.cardServ.SearchedCardsObservable.next(null);
        }
      });
    } else {
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
}
