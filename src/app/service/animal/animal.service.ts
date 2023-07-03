import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {Animal} from "../../model/animal";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private readonly animalsMap = new Map<number, Animal>();
  loaded = false;

  constructor(private http: HttpClient) {
  }

  loadAnimals(): Observable<Animal[]>{
    return this.http.get<Animal[]>(environment.url + "/animals").pipe(tap(animals => {
      this.animalsMap.clear();
      for (const animal of animals) {
        this.animalsMap.set(animal.id, animal);
      }
      this.loaded = true;
    }))
  }

  translate(id: number): string {
    return this.animalsMap.get(id)?.name ?? "";
  }

  getAnimalById(id: number): Animal | undefined{
    return this.animalsMap.get(id)
  }

  get animals(): Animal[] {
    return [...this.animalsMap.values()];
  }
}
