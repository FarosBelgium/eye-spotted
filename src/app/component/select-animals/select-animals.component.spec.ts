import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectAnimalsComponent} from './select-animals.component';
import {AppModule} from "../../app.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DynamicDialogRef} from "primeng/dynamicdialog";

describe('SelectAnimalsComponent', () => {
  let component: SelectAnimalsComponent;
  let fixture: ComponentFixture<SelectAnimalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAnimalsComponent],
      imports: [AppModule, HttpClientTestingModule],
      providers: [
        {provide: DynamicDialogRef, useValue: {}},

      ]
    });
    fixture = TestBed.createComponent(SelectAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
