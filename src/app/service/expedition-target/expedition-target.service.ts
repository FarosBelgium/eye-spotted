import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Sighting} from "../../model/sighting";

@Injectable({
  providedIn: 'root'
})
export class ExpeditionTargetService {

  constructor(private http: HttpClient) {
  }

  registerSighting(id: number, sighting: Sighting) {
    return this.http.post(environment.url + "/expedition-targets/" + id + "/sightings", sighting);
  }

  removeSighting(id: number) {
    return this.http.delete(environment.url + "/expedition-targets/" + id + "/sightings");

  }
}
