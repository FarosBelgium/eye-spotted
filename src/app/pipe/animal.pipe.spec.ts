import {AnimalPipe} from './animal.pipe';
import {AnimalService} from "../service/animal/animal.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('AnimalPipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], providers: [
        {provide: HttpClient, useValue: {get: jasmine.anything()}}
      ]
    });
  });

  it('create an instance', () => {
    const animalService = TestBed.inject(AnimalService)
    const pipe = new AnimalPipe(animalService);
    expect(pipe).toBeTruthy();
  });
});
