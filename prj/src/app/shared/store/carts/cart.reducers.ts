import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { card } from '../../model/cardModel';

export interface cartState {
  products: card[];
  totalPrice: number;
}

export const initialCartState: cartState = {
  products: [],
  totalPrice: 0,
};

export const cartRecudecer = createReducer(
  initialCartState,
  on(CartActions.addtoCart, (state, { product }) => {
    const updatedCart = [...state.products, product];
    return {
      ...state,
      products: updatedCart,
      totalPrice: state.totalPrice + product.Price,
    };
  }),
  on(CartActions.removeFromCart, (state, { product }) => {
    const updatedCart = state.products.filter((prod) => prod.Id !== product.Id);
    return {
      ...state,
      products: updatedCart,
      totalPrice: state.totalPrice - product.Price * product.SelectedQuantity,
    };
  }),
  on(CartActions.IncrProdQuant, (state, { product }) => {
    const updatedCart = state.products.map((prod) =>
      prod.Id === product.Id
        ? { ...prod, SelectedQuantity: prod.SelectedQuantity + 1 }
        : prod
    );
    return {
      ...state,
      products: updatedCart,
      totalPrice: state.totalPrice + product.Price,
    };
  }),
  on(CartActions.DecrProdQuant, (state, { product }) => {
    const updatedCart = state.products.map((prod) =>
      prod.Id === product.Id
        ? { ...prod, SelectedQuantity: prod.SelectedQuantity - 1 }
        : prod
    );
    return {
      ...state,
      products: updatedCart,
      totalPrice: state.totalPrice - product.Price,
    };
  })
);
