import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Expedition} from "../../model/expedition";
import {CreateExpedition} from "../../model/createExpedition";
import {ExpeditionTargetCount} from "../../model/expeditionTargetCount";
import {ExpeditionFilter} from "../../model/expedition-filter";
import {toLocalDateString} from "../../util/date-util";
import {ExpeditionData} from "../../model/expeditionData";
import {Animal} from "../../model/animal";

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {

  constructor(private http: HttpClient) {

  }

  getOpenExpeditions(): Observable<Expedition[]> {
    return this.http.get<Expedition[]>(environment.url + "/expeditions");
  }

  getClosedExpeditions(filter: ExpeditionFilter | {} = {}): Observable<Expedition[]> {
    let params = new HttpParams()
      .append("status", "closed");


    Object.entries(filter).forEach(([key, value]) => {
      const isArray = Array.isArray(value)
      if ((isArray && value.length > 0) || (value && !isArray)) {
        params = params.append(key, this.format(value));
      }
    });

    return this.http.get<Expedition[]>(environment.url + "/expeditions", {params});
  }

  createExpedition(expedition: CreateExpedition): Observable<Expedition> {
    return this.http.post<Expedition>(environment.url + "/expeditions", expedition);
  }
  addExpeditionTargets(animals : Animal[],id:number){
    return this.http.post<void>(environment.url + "/expeditions/" + id + "/targets",animals)
  }
  getExpedition(id: number): Observable<Expedition> {
    return this.http.get<Expedition>(environment.url + "/expeditions/" + id);
  }

  getExpeditionTargets(id: number): Observable<ExpeditionTargetCount[]> {
    return this.http.get<ExpeditionTargetCount[]>(environment.url + "/expeditions/" + id + "/expedition-targets");
  }

  closeExpedition(id: number): Observable<Expedition> {
    return this.http.delete<Expedition>(environment.url + "/expeditions/" + id + "/close");
  }

  private format(param: Date | string): string {
    const date = new Date(param)
    if (date.toString() === "Invalid Date") {
      return param as string;
    }
    return toLocalDateString(date);
  }
  getExpeditionData(id: number): Observable<ExpeditionData> {
    return this.http.get<ExpeditionData>(environment.url + "/expeditions/" + id + "/data");
  }


  downloadExpeditionData(id: number): Observable<any> {
    return this.http.get(environment.url + "/expeditions/" + id + "/data/download",{responseType: "text"})
  }
}
