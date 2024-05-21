import { createReducer, on } from '@ngrx/store';
import { decrease, incerase } from './counter.actions';
export interface counterState {
  count: number;
}

export const initialCounterState: counterState = {
  count: 0,
};

export const counterReducer = createReducer(
  initialCounterState,
  on(incerase, (state) => ({ ...state, count: state.count + 1 })),
  on(decrease, (state) => ({ ...state, count: state.count - 1 }))
);
