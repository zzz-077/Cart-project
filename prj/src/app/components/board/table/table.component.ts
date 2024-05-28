import {
  Component,
  NgZone,
  inject,
  OnInit,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { card, filterObj } from '../../../shared/model/cardModel';
import { log } from 'console';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { EventEmitter } from 'stream';
import { Observable, debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  decrease,
  incerase,
} from '../../../shared/store/counter/counter.actions';
import { addtoCart } from '../../../shared/store/carts/cart.actions';
import { cartSelector } from '../../../shared/store/carts/cart.selectors';
import { AppState } from '../../../shared/store/app.state';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  currCardTo: number = 5;
  currCardFr: number = 0;
  loadersLength: number[] = [1, 2, 3, 4, 5, 6];
  whichSortIcon: string = '';
  clickedCardId: string = '';
  isData: boolean = false;
  isSearched: boolean = false;
  isFilterFolded: boolean = false;
  Iconclick: boolean = false;
  isCardExistsInCart: boolean = false;
  isVisible: boolean = false;
  cartproducts$: Observable<card[]>;
  CardsArr: card[] = [];
  checkInCartArr: card[] = [];
  DisabledColumn: filterObj[] = [
    { Name: 'Name', Value: true },
    { Name: 'Category', Value: true },
    { Name: 'Price', Value: true },
    { Name: 'Quantity', Value: true },
  ];

  constructor(
    private cardServ: CardsService,
    private filterServ: FilterService,
    private store: Store<AppState>
  ) {
    this.cartproducts$ = this.store.select(cartSelector);
    this.cartproducts$.subscribe((data) => {
      if (data != undefined || null) this.checkInCartArr = data;
    });

    this.filterServ.filterObject$.subscribe((obj) => {
      if (obj != undefined) {
        this.DisabledColumn.forEach((item, i) => {
          if (obj[i].Name == item.Name) item.Value = obj[i].Value;
        });
      }
    });

    this.cardServ.searchedCards$.subscribe((data) => {
      console.log(data);

      if (data !== 'notFound' && data != null) {
        this.CardsArr = data;
        this.isData = true;
      } else if (data === 'notFound') {
        this.CardsArr = [];
        this.isData = false;
      } else {
        this.isData = true;
        this.CardsArr = [];
      }
    });

    this.cardServ.newCards$.subscribe((obj: any) => {
      if (obj != null) {
        (this.currCardFr = obj?.a), (this.currCardTo = obj?.b);
      }
      this.getCards(this.currCardFr, this.currCardTo);
    });
  }

  SortClick(value: string) {
    this.whichSortIcon = value;
    switch (value) {
      case 'Name': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Name > b.Name) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Name > b.Name) return -1;
            else return 1;
          });
        }
        break;
      }
      case 'Category': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Category > b.Category) return 1;
            else if (a.Category < b.Category) return -1;
            else return 0;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Category > b.Category) return -1;
            else if (a.Category < b.Category) return 1;
            else return 0;
          });
        }
        break;
      }
      case 'Price': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Price > b.Price) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Price > b.Price) return -1;
            else return 1;
          });
        }
        break;
      }
      case 'Quantity': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Quantity > b.Quantity) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Quantity > b.Quantity) return -1;
            else return 1;
          });
        }
        break;
      }
    }
  }

  getCards(val1: number, val2: number) {
    this.cardServ.getCards(val1, val2).subscribe((data: any) => {
      this.CardsArr = [];
      this.CardsArr = data;
    });
  }
  addToCartBtn(card: card) {
    var checkIsExists = false;
    this.isCardExistsInCart = false;
    checkIsExists = this.checkInCartArr.some((obj) => {
      return obj.Id === card.Id;
    });
    if (!checkIsExists) {
      this.cardServ.CartAnimationObservable.next(true);
      this.store.dispatch(incerase());
      this.store.dispatch(addtoCart({ product: card }));
    } else {
      this.cardServ.CartAnimationObservable.next(false);

      this.clickedCardId = card.Id;
      this.isCardExistsInCart = true;
      setTimeout(() => {
        this.isVisible = true;
      }, 10);

      setTimeout(() => {
        this.isVisible = false;
        setTimeout(() => {
          this.isCardExistsInCart = false;
        }, 4000);
      }, 4000);
    }
  }
}
