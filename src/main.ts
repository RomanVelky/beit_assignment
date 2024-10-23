import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

const modifiedAppConfig = {
  providers: [importProvidersFrom(BrowserAnimationsModule)],
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  ...modifiedAppConfig,
}).catch((err) => console.error(err));
