import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueloPage } from './duelo.page';

describe('DueloPage', () => {
  let component: DueloPage;
  let fixture: ComponentFixture<DueloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
