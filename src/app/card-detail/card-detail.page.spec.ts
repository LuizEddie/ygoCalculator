import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailPage } from './card-detail.page';

describe('CardDetailPage', () => {
  let component: CardDetailPage;
  let fixture: ComponentFixture<CardDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
