import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedExpeditionsComponent } from './closed-expeditions.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ClosedExpeditionsComponent', () => {
  let component: ClosedExpeditionsComponent;
  let fixture: ComponentFixture<ClosedExpeditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedExpeditionsComponent],
      imports: [AppModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ClosedExpeditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
