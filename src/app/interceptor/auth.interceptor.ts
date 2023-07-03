import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.username && this.authService.username.length > 0){
      const headers = request.headers.append("Authorization", this.authService.username);
      const newRequest = request.clone({headers});

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
