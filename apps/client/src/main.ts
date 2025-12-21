import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

const auth0Config = mergeApplicationConfig(appConfig, {
  providers: [
    provideAuth0({
      ...environment.auth0,
    }),
  ],
});

bootstrapApplication(App, auth0Config).catch((err) => console.error(err));
