import { cartState } from './carts/cart.reducers';
import { counterState } from './counter/counter.reducers';
import { productsState } from './products/product.reducers';

export interface AppState {
  counter: counterState;
  product: productsState;
  cart: cartState;
}
