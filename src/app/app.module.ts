import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgModel, NgForm, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CustomSnackbarComponent } from './materialModule/custom-snackbar/custom-snackbar.component';

// Import routing module
import { AppRoutingModule } from './app.routing';

// snackbar service
import { SnackbarService } from './materialModule/snackbar/snackbar.service';

const routes: Routes = [
  { path: '', redirectTo: '/bill/management', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./app.routing').then(module => module.AppRoutingModule) },
];

@NgModule({
  declarations: [
    AppComponent,
    CustomSnackbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    SnackbarService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  entryComponents: [CustomSnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
