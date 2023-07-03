import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../service/auth/auth.service";
import {map} from "rxjs";
import {AnimalService} from "../../service/animal/animal.service";

export const animalGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const animalService = inject(AnimalService);

  return authService.username$.pipe(map(username => {
    if (username !== undefined && animalService.animals.length === 0) {
      animalService.loadAnimals().subscribe();
    }
    return true
  }))
};
