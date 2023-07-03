import { TestBed } from '@angular/core/testing';

import { ExpeditionTargetService } from './expedition-target.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExpeditionTargetService', () => {
  let service: ExpeditionTargetService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ExpeditionTargetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

