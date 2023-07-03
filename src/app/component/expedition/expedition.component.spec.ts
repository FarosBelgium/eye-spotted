import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionComponent } from './expedition.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExpeditionComponent', () => {
  let component: ExpeditionComponent;
  let fixture: ComponentFixture<ExpeditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpeditionComponent],
      imports: [AppModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
