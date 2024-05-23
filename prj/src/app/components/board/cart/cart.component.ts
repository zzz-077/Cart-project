import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/store/app.state';
import { Observable } from 'rxjs';
import { card } from '../../../shared/model/cardModel';
import * as ProductActions from '../../../shared/store/products/product.actions';
import * as CartActions from '../../../shared/store/carts/cart.actions';
import * as CounterActions from '../../../shared/store/counter/counter.actions';
import { cartSelector } from '../../../shared/store/carts/cart.selectors';
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
  SelectedProducts: card[] = [];
  constructor(private store: Store<AppState>) {
    this.store.dispatch(ProductActions.productsLoad());
    this.cartproducts$ = this.store.select(cartSelector);
    // this.error = this.store.select(selectProductsError);
    this.cartproducts$.subscribe((product) => {
      this.SelectedProducts = product;
    });
  }

  hideCartFunc() {
    this.hideCart.emit(false);
  }
  removeProductclick(productID: string | undefined) {
    this.store.dispatch(
      CartActions.removeFromCart({ productId: productID as string })
    );
    this.store.dispatch(CounterActions.decrease());
  }
}
