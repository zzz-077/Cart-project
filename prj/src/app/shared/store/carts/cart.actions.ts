import { createAction, props } from '@ngrx/store';
import { card } from '../../model/cardModel';

export const addtoCart = createAction(
  '[Item] Add Item To Cart',
  props<{ product: card }>()
);
export const removeFromCart = createAction(
  '[Item] Remove Item From Cart',
  props<{ product: card }>()
);
export const IncrProdQuant = createAction(
  '[Item] Increase Quantity of Item',
  props<{ product: card }>()
);
export const DecrProdQuant = createAction(
  '[Item] Decrease Quantity of Item',
  props<{ product: card }>()
);
