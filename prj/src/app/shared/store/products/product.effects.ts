import { Injectable } from '@angular/core';
import { CardsService } from '../../services/cards/cards.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { card } from '../../model/cardModel';
@Injectable()
export class ProductEffect {
  constructor(private actions$: Actions, private cardServ: CardsService) {}

  loadproducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.productsLoad),
      switchMap(() =>
        this.cardServ.getAllCards().pipe(
          map((res) =>
            ProductActions.productsLoadSuccess({ products: res as card[] })
          ),
          catchError((error) =>
            of(
              ProductActions.productsLoadFailure({
                errorMessage: 'Fail to load products',
              })
            )
          )
        )
      )
    )
  );
}
