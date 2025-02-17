import { ApplicationConfig, EnvironmentProviders, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { browserPopupRedirectResolver, getAuth, indexedDBLocalPersistence, initializeAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideEntityData, withEffects } from '@ngrx/data';
import * as fromEntity from './entity-metadata';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import * as fromAuthReducer from './core/store/reducers/auth.reducer';
import * as fromRoot from './core/store/states/app.state';
import { AuthEffects } from './core/store/effects/auth.effects';
import { ConfigEffects } from './core/store/effects/config.effects';
import { AppEffects } from './core/store/effects/app.effects';
import { RouteEffects } from './core/store/router/route.effects';
import { DialogEffects } from './core/store/effects/dialog.effects';
import { SnackEffects } from './core/store/effects/snack.effects';
import { SpinnerEffects } from './core/store/effects/spinner.effects';
import { registeredEffects } from './core/store/config/registered-effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storeConfig } from './core/store/config/store-config';
const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  // firebaseConfig is the json extracted for client-side web app
 
]);
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserAnimationsModule, FlexLayoutModule,RouterModule.forRoot(routes)]),
    provideRouter(routes, withViewTransitions()),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    provideAuth(() => {
        const auth = initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence,
            popupRedirectResolver: browserPopupRedirectResolver,
        });
        return auth;
    }),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService,
    provideDatabase(() => getDatabase()),
    provideStore(fromRoot.reducers, storeConfig),
    //provideStoreDevtools({
      //maxAge: 25, // Retains last 25 states
      //logOnly: !isDevMode(), // Restrict extension to log-only mode
      //autoPause: false, // Pauses recording actions and state changes when the extension window is not open
      //trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      //traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
     // connectInZone: true // If set to true, the connection is established within the Angular zone
   // }),
    provideEffects(registeredEffects),
    provideEntityData(fromEntity.entityConfig, withEffects()),
    provideRouterStore(),
    provideToastr({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    })
]
};
