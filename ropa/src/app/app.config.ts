import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideNgxStripe } from 'ngx-stripe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CalculateTotalPricePipe } from './pipes/calculate-total-price.pipe';
import { environment } from '../environments/environment.development';

export function createTranslateLoader(httpClient: HttpClient){
  return new TranslateHttpLoader(httpClient, './i18n/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(),
     provideNgxStripe(), 
     provideAnimationsAsync(),
    provideToastr(), 
     provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
       provideFirestore(() => getFirestore()),
       importProvidersFrom(
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
          },
          defaultLanguage: 'es'
        })
      ), provideAnimationsAsync(), 
      provideAnimationsAsync(), 
      CalculateTotalPricePipe, provideAnimationsAsync()
      
  ]
};
