import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from './component/login/login.component';
import {OpenExpeditionsComponent} from './component/open-expeditions/open-expeditions.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StyleClassModule} from "primeng/styleclass";
import {RouterModule} from "@angular/router";
import {ClosedExpeditionsComponent} from './component/closed-expeditions/closed-expeditions.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {CreateExpeditionComponent} from './component/create-expedition/create-expedition.component';
import {CalendarModule} from "primeng/calendar";
import {SelectAnimalsComponent} from './component/select-animals/select-animals.component';
import {TableModule} from "primeng/table";
import {TreeTableModule} from "primeng/treetable";
import {ToastModule} from "primeng/toast";
import {RegisterComponent} from './component/register/register.component';
import {AvatarModule} from "primeng/avatar";
import {ExpeditionComponent} from './component/expedition/expedition.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {ExpeditionReportComponent} from './component/expedition-report/expedition-report.component';
import {ChartModule} from "primeng/chart";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import {ChipModule} from "primeng/chip";
import {LanguageInterceptor} from "./interceptor/language.interceptor";
import {MultiSelectModule} from "primeng/multiselect";
import { AnimalPipe } from './pipe/animal.pipe';
import { Base64ImagePipe } from './pipe/image/base64-image.pipe';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MessageService} from "primeng/api";
import {NgOptimizedImage} from "@angular/common";
import {DialogService} from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpenExpeditionsComponent,
    ClosedExpeditionsComponent,
    CreateExpeditionComponent,
    SelectAnimalsComponent,
    RegisterComponent,
    ExpeditionComponent,
    ExpeditionReportComponent,
    AnimalPipe,
    Base64ImagePipe,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        RippleModule,
        StyleClassModule,
        HttpClientModule,
        CardModule,
        DialogModule,
        CalendarModule,
        ReactiveFormsModule,
        TableModule,
        TreeTableModule,
        ToastModule,
        AvatarModule,
        ChipsModule,ChartModule,
        ChipsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        DropdownModule,
        ChipModule,
        MultiSelectModule,
        ProgressSpinnerModule,
        NgOptimizedImage
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true},
    MessageService, DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
