import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCartState = (state: AppState) => state.cart;

export const cartSelector = createSelector(
  selectCartState,
  (state) => state.products
);

export const cartTotalPriceSelector = createSelector(
  selectCartState,
  (state) => state.totalPrice
);
