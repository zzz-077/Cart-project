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
    this.cardServ
      .findCards(value)

      .subscribe((data) => {
        if (data) {
          this.cardServ.SearchedCardsObservable.next(data);
        }
      });
  }
}
