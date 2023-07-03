import {SightingsByAnimal} from "./sightingsByAnimal";
import {SightingsByDay} from "./sightingsByDay";

export interface ExpeditionData {
  totalCount: number
  sightingsByDays: SightingsByDay[];
  sightingsByAnimals: SightingsByAnimal[];

}
