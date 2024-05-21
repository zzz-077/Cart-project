import { createReducer, on } from '@ngrx/store';
import { card } from '../../model/cardModel';
import * as ProductActions from './product.actions';

export interface productsState {
  products: card[];
  error: string | null;
}

export const initialProductState: productsState = {
  products: [],
  error: null,
};

export const ProductReducer = createReducer(
  initialProductState,
  on(ProductActions.productsLoadSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
  })),
  on(ProductActions.productsLoadFailure, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  }))
);
