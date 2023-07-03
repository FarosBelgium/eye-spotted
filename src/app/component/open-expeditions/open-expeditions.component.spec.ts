import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenExpeditionsComponent } from './open-expeditions.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OpenExpeditionsComponent', () => {
  let component: OpenExpeditionsComponent;
  let fixture: ComponentFixture<OpenExpeditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenExpeditionsComponent],
      imports: [AppModule,HttpClientTestingModule,]
    });
    fixture = TestBed.createComponent(OpenExpeditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
