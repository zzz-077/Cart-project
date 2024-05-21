import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { counterReducer } from './shared/store/counter/counter.reducers';
import { ProductReducer } from './shared/store/products/product.reducers';
import { provideEffects } from '@ngrx/effects';
import { ProductEffect } from './shared/store/products/product.effects';
import { cartRecudecer } from './shared/store/carts/cart.reducers';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ]),
    provideClientHydration(),
    provideStore(),
    provideState({ name: 'counter', reducer: counterReducer }),
    provideState({ name: 'product', reducer: ProductReducer }),
    provideState({ name: 'cart', reducer: cartRecudecer }),
    provideEffects(ProductEffect),
  ],
};
