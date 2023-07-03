import { Injectable } from '@angular/core';
import {LoginDetail} from "../../model/login-detail";
import {RegisterDetail} from "../../model/register-detail";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly sessionKey = "eyeSpottedUserSession";
  private readonly url = environment.url + "/auth"

  username: string | undefined = undefined;
  private usernameDataSource = new BehaviorSubject<string | undefined>(this.username);
  username$: Observable<string | undefined> = this.usernameDataSource.asObservable();
  constructor(private http: HttpClient) { }

  login(loginDetail: LoginDetail): Observable<boolean> {
    return this.http.post<boolean>(this.url + "/login", loginDetail).pipe(tap(reponse => {
      if (reponse) {
        this.username = loginDetail.username
        this.usernameDataSource.next(this.username);
        localStorage[this.sessionKey] = this.username;
      }
    }));
  }

  logout(): void {
    this.username = undefined;
    this.usernameDataSource.next(undefined);
    localStorage.removeItem(this.sessionKey)
  }

  register(registerDetail: RegisterDetail): Observable<boolean> {
    return this.http.post<boolean>(this.url + "/register", registerDetail);
  }

  tryContinueSession(): Observable<boolean> {
    const username: string | null = localStorage[this.sessionKey];
    if (username) {
      return this.login({username, password: 'password'})
    }
    return of(false)
  }
}
