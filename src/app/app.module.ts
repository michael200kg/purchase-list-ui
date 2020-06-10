import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {BASE_PATH} from "./@api-module";
import {APP_BASE_HREF} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {PurchasesModule} from "./@purchases/purchases.module";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        PurchasesModule,
        FlexModule,
        FlexLayoutModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: BASE_PATH, useValue: environment.basePath},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
