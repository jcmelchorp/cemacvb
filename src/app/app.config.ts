import { ApplicationConfig, EnvironmentProviders, importProvidersFrom } from '@angular/core';
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
import { entityConfig } from './entity-metadata';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { reducers } from './core/store/states/app.state';
import * as fromRoot from './core/store/states/app.state';
import { AuthEffects } from './core/store/effects/auth.effects';
import { ConfigEffects } from './core/store/effects/config.effects';
import { AppEffects } from './core/store/effects/app.effects';
const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  // firebaseConfig is the json extracted for client-side web app
 
]);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([BrowserAnimationsModule, FlexLayoutModule,RouterModule.forRoot(routes)]),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    provideAuth(() => {
        const auth = initializeAuth(getApp(), {
            persistence: indexedDBLocalPersistence,
            popupRedirectResolver: browserPopupRedirectResolver,
        });
        // if (environment.useAuthEmulator) {
        //   connectAuthEmulatorInDevMode(auth);
        // }
        return auth;
    }),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService,
    provideDatabase(() => getDatabase()),
    provideStore( fromRoot.reducers),
    provideRouterStore(),
    provideEffects([AuthEffects,ConfigEffects,AppEffects]),
    provideEntityData(entityConfig, withEffects()),
    provideToastr({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true
    })
]
};
