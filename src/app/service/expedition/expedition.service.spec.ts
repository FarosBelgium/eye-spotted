import { TestBed } from '@angular/core/testing';

import { ExpeditionService } from './expedition.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExpeditionService', () => {
  let service: ExpeditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ExpeditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
