import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardsService } from './shared/services/cards/cards.service';
import { card } from './shared/model/cardModel';
import { TableComponent } from './components/board/table/table.component';
import { SearchComponent } from './components/board/search/search.component';
import { FilterComponent } from './components/board/filter/filter.component';
import { log } from 'node:console';
import { Observable, debounceTime, find } from 'rxjs';
import { CartComponent } from './components/board/cart/cart.component';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from './shared/store/app.state';
import { selectCount } from './shared/store/counter/cart.selector';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    TableComponent,
    SearchComponent,
    FilterComponent,
    CartComponent,
    AsyncPipe,
  ],
})
export class AppComponent {
  title = 'prj';
  FilteredColumn: {} = {};
  CurrentPage: number = 1;
  pagesLimit: number = 0;
  pageArr: any[] = [];
  currCardFr: number = 0;
  currCardTo: number = 5;
  isMaxPageNumber: boolean = false;
  isMinPageNumber: boolean = true;
  isFilterFolded: boolean = false;
  isCartOpened: boolean = false;
  cartCount$: Observable<number>;
  constructor(private cardServ: CardsService, private store: Store<AppState>) {
    this.cartCount$ = this.store.select(selectCount);
  }

  ngOnInit() {
    this.cardServ.getCardsLength().subscribe((val) => {
      if (val != null) {
        this.pagesLimit = Math.ceil(val / 6);
      }
      for (let i = 1; i <= this.pagesLimit; i++) {
        this.pageArr.push(i);
      }
    });
  }

  filtericonClick() {
    this.isFilterFolded = !this.isFilterFolded;
  }

  filteredObjecFunc(obj: { Name: string; Value: boolean }) {
    this.FilteredColumn = obj;
  }

  //pagination
  arrowClick(arrow: string) {
    if (arrow === 'next') {
      this.isMinPageNumber = false;
      if (this.CurrentPage != this.pageArr.length) {
        this.CurrentPage++;
        this.pageClickServ('next');
      }
    } else {
      if (this.CurrentPage == 1) {
        this.CurrentPage = 1;
        this.pageClickServ('prev');
      } else {
        this.CurrentPage--;
        this.pageClickServ('prev');
      }
    }
    if (this.CurrentPage == 1) this.isMinPageNumber = true;
    else this.isMinPageNumber = false;
    if (this.CurrentPage == this.pageArr.length) this.isMaxPageNumber = true;
    else this.isMaxPageNumber = false;
  }

  pageClick(page: number) {
    this.currCardFr = 6 * page - 6;
    this.currCardTo = 6 * page - 1;
    this.cardServ.setNewPage(this.currCardFr, this.currCardTo);

    this.CurrentPage = page;
    this.isMaxPageNumber = false;
    this.isMinPageNumber = false;
    if (this.CurrentPage == 1) this.isMinPageNumber = true;
    else if (this.CurrentPage == this.pageArr.length)
      this.isMaxPageNumber = true;
  }

  pageClickServ(value: string) {
    if (value === 'next') {
      this.currCardFr += 6;
      this.currCardTo += 6;
      this.cardServ.setNewPage(this.currCardFr, this.currCardTo);
    } else {
      this.currCardFr -= 6;
      this.currCardTo -= 6;
      this.cardServ.setNewPage(this.currCardFr, this.currCardTo);
    }
  }

  //cartClick
  cartClick() {
    this.isCartOpened = true;
  }

  hideCartFromChild(event: boolean) {
    this.isCartOpened = event;
  }
}
