import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from '../environments/environment.development';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './shared/store/cart.reducers';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ]),
    provideClientHydration(),
    provideStore(),
    provideState({ name: 'counter', reducer: cartReducer }),
  ],
};
