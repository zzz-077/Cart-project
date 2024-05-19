import { createReducer, on } from '@ngrx/store';
import { RemoveFromCart, addToCart } from './cart.actions';
export interface counterState {
  count: number;
}

export const initialCounterState: counterState = {
  count: 0,
};

export const cartReducer = createReducer(
  initialCounterState,
  on(addToCart, (state) => ({ ...state, count: state.count + 1 })),
  on(RemoveFromCart, (state) => ({ ...state, count: state.count - 1 }))
);
