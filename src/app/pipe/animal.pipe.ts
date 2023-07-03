import {Pipe, PipeTransform} from '@angular/core';
import {Animal} from "../model/animal";
import {AnimalService} from "../service/animal/animal.service";

@Pipe({
  name: 'animal'
})
export class AnimalPipe implements PipeTransform {

  constructor(private animalService: AnimalService) {
  }

  transform(value: number): Animal | undefined {
    return this.animalService.getAnimalById(value);
  }

}
