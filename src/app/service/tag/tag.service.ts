import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../../model/tag";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}
 getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.url + "/tags");
  }

}
