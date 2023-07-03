import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionReportComponent } from './expedition-report.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ExpeditionReportComponent', () => {
  let component: ExpeditionReportComponent;
  let fixture: ComponentFixture<ExpeditionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpeditionReportComponent],
      imports: [AppModule,HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ExpeditionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
