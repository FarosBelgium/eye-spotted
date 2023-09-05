import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpeditionTargetService {

  constructor(private http: HttpClient) {
  }

  registerSighting(id: number) {
    return this.http.post(environment.url + "/expedition-targets/" + id + "/sightings",null);
  }

  removeSighting(id: number) {
    return this.http.delete(environment.url + "/expedition-targets/" + id + "/sightings");

  }
}
