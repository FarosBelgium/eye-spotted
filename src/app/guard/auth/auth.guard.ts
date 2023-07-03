import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../service/auth/auth.service";
import {map, Observable} from "rxjs";

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  return inject(AuthService).username$.pipe(map(x => {
    if (x === undefined) {
      router.navigate([''])
      return false;
    }
    return true;
  }));
};
