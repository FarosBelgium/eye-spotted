import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { animalGuard } from './animal.guard';

describe('animalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => animalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
