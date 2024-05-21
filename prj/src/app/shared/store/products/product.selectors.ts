import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsState } from './product.reducers';

export const selectproductSelector =
  createFeatureSelector<productsState>('products');

export const selectAllproducts = createSelector(
  selectproductSelector,
  (state) => state.products
);
export const selectProductsError = createSelector(
  selectproductSelector,
  (state) => state.error
);
