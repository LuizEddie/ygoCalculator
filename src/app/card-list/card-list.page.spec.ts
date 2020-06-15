import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListPage } from './card-list.page';

describe('CardListPage', () => {
  let component: CardListPage;
  let fixture: ComponentFixture<CardListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
