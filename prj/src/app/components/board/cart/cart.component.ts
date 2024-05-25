import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/store/app.state';
import { Observable, map } from 'rxjs';
import { card } from '../../../shared/model/cardModel';
import * as ProductActions from '../../../shared/store/products/product.actions';
import * as CartActions from '../../../shared/store/carts/cart.actions';
import * as CounterActions from '../../../shared/store/counter/counter.actions';
import {
  cartSelector,
  cartTotalPriceSelector,
} from '../../../shared/store/carts/cart.selectors';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  // error!: Observable<string | null>;
  @Output() hideCart = new EventEmitter<boolean>();
  cartproducts$: Observable<card[]>;
  cartTotalPrice$: Observable<number>;

  constructor(private store: Store<AppState>) {
    // this.store.dispatch(ProductActions.productsLoad());
    this.cartproducts$ = this.store.select(cartSelector);
    this.cartTotalPrice$ = this.store.select(cartTotalPriceSelector);
    // this.error = this.store.select(selectProductsError);
    this.cartTotalPrice$ = this.cartTotalPrice$.pipe(
      map((value) => {
        return Math.round(value * 100) / 100;
      })
    );
  }

  hideCartFunc() {
    this.hideCart.emit(false);
  }
  removeProductclick(Product: card | undefined) {
    this.store.dispatch(
      CartActions.removeFromCart({ product: Product as card })
    );
    this.store.dispatch(CounterActions.decrease());
  }
  checkNameLength(name: string | undefined): string | undefined {
    if (name !== undefined) {
      if (name.length <= 15) {
        return name;
      }
    }
    return undefined;
  }
  increaseQuantity(Product: card) {
    this.store.dispatch(CartActions.IncrProdQuant({ product: Product }));
  }
  decreaseQuantity(Product: card) {
    this.store.dispatch(CartActions.DecrProdQuant({ product: Product }));
  }
}
