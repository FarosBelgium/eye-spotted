import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LanguageService} from "../service/language/language.service";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor(private languageService: LanguageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.headers.append("Accept-Language", this.languageService.selectedLanguage);
    const newRequest = request.clone({headers});

    return next.handle(newRequest);
  }
}
