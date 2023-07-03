import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpeditionComponent } from './create-expedition.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CreateExpeditionComponent', () => {
  let component: CreateExpeditionComponent;
  let fixture: ComponentFixture<CreateExpeditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateExpeditionComponent],
      imports: [AppModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(CreateExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
