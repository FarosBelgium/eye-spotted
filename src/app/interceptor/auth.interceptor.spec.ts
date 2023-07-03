import {TestBed} from '@angular/core/testing';

import {AuthInterceptor} from './auth.interceptor';
import {HttpClient} from "@angular/common/http";

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: {get: jasmine.anything()}},
      AuthInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
