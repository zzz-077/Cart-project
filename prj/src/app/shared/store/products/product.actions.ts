import { createAction, props } from '@ngrx/store';
import { card } from '../../model/cardModel';

export const productsLoad = createAction('[Item] productsLoad');
export const productsLoadSuccess = createAction(
  '[Item] productsLoadSuccess',
  props<{ products: card[] }>()
);
export const productsLoadFailure = createAction(
  '[Item] productsLoadFailure',
  props<{ errorMessage: string | null }>()
);
