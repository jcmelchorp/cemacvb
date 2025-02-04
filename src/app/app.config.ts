import { ApplicationConfig, EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
const firebaseProviders: EnvironmentProviders = importProvidersFrom([
  // firebaseConfig is the json extracted for client-side web app
 
]);
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([BrowserAnimationsModule, FlexLayoutModule]),
    provideAnimations(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage()),
    provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService,
    provideDatabase(() => getDatabase()),
   ]
};
