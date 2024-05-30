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
import { selectCount } from './shared/store/counter/counter.selector';
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
  CurrentPage: number = 1;
  pagesLimit: number = 0;
  currCardFr: number = 0;
  currCardTo: number = 5;
  minP: number = 1;
  maxP: number = 3;
  isMaxPageNumber: boolean = false;
  isMinPageNumber: boolean = true;
  isFilterFolded: boolean = false;
  isCartOpened: boolean = false;
  isCartAnimationStarted: boolean = false;
  pageArr: any[] = [];
  FilteredColumn: {} = {};
  cartCount$: Observable<number>;
  constructor(private cardServ: CardsService, private store: Store<AppState>) {
    this.cartCount$ = this.store.select(selectCount);
    this.cardServ.cartAnimation$.subscribe((bool) => {
      if (bool) {
        this.isCartAnimationStarted = bool;
        setTimeout(() => {
          this.isCartAnimationStarted = false;
        }, 890);
      }
    });
  }

  ngOnInit() {
    this.cardServ.getCardsLength().subscribe((val) => {
      if (val != null) {
        this.pagesLimit = Math.ceil(val / 6);
      }
      for (let i = 1; i <= 3; i++) {
        this.pageArr.push(i);
      }
    });
  }

  //filtericon
  filtericonClick() {
    this.isFilterFolded = !this.isFilterFolded;
  }

  filteredObjecFunc(obj: { Name: string; Value: boolean }) {
    this.FilteredColumn = obj;
  }

  //pagination
  changePaginationArr(page: string | number) {
    if (page === 'next' && !this.isMaxPageNumber) {
      this.increasePagg();
    } else if (page === 'prew' && !this.isMinPageNumber) {
      this.decreasePagg();
    } else {
      if (page === this.maxP) {
        this.increasePagg();
      } else if (page === this.minP) {
        this.decreasePagg();
      } else {
        this.isMaxPageNumber = false;
        this.isMinPageNumber = false;
      }
    }
  }

  increasePagg() {
    if (this.pageArr[this.pageArr.length - 1] != this.pagesLimit) {
      this.isMaxPageNumber = false;
      this.pageArr = this.pageArr.map((i) => {
        if (i === this.minP) {
          i = this.minP + 1;
          return i;
        } else if (i === this.maxP) {
          i = this.maxP + 1;
          return i;
        } else {
          return i + 1;
        }
      });
      this.maxP++;
      this.minP++;
    } else {
      this.isMaxPageNumber = true;
    }
  }

  decreasePagg() {
    if (this.pageArr[0] != 1) {
      this.isMinPageNumber = false;
      this.pageArr = this.pageArr.map((i) => {
        if (i === this.minP) {
          i = this.minP - 1;
          return i;
        } else if (i === this.maxP) {
          i = this.maxP - 1;
          return i;
        } else {
          return i - 1;
        }
      });
      this.maxP--;
      this.minP--;
    } else {
      this.isMinPageNumber = true;
    }
  }

  arrowClick(arrow: string) {
    if (arrow === 'next') {
      this.isMinPageNumber = false;
      this.CurrentPage++;
      this.pageClickServ('next');
      if (this.CurrentPage === this.maxP) this.changePaginationArr(arrow);
    } else {
      this.isMaxPageNumber = false;
      if (this.CurrentPage == 1) {
        this.CurrentPage = 1;
        this.pageClickServ('prev');
      } else {
        this.CurrentPage--;
        this.pageClickServ('prev');
        if (this.CurrentPage === this.minP) this.changePaginationArr(arrow);
      }
    }
    if (this.CurrentPage == 1) this.isMinPageNumber = true;
    else this.isMinPageNumber = false;
  }

  pageClick(page: number) {
    if (page === this.pageArr[0]) {
      this.isMaxPageNumber = false;
    } else if (page === this.pageArr[this.pageArr.length - 1]) {
      this.isMinPageNumber = false;
    }
    this.changePaginationArr(page);
    this.currCardFr = 6 * page - 6;
    this.currCardTo = 6 * page - 1;
    this.cardServ.setNewPage(this.currCardFr, this.currCardTo);

    this.CurrentPage = page;
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
