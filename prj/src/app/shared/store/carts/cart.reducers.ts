import { createReducer, on } from '@ngrx/store';
import { card } from '../../model/cardModel';
import * as CartActions from './cart.actions';

export interface cartState {
  products: card[];
}

export const initialCartState: cartState = {
  products: [],
};

export const cartRecudecer = createReducer(
  initialCartState,
  on(CartActions.addtoCart, (state, { product }) => {
    const updatedCart = [...state.products, product];
    return {
      ...state,
      products: updatedCart,
    };
  }),
  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedCart = state.products.filter((prod) => prod.Id !== productId);
    return {
      ...state,
      products: updatedCart,
    };
  })
);
