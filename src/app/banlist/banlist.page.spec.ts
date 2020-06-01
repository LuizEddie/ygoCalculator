import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanlistPage } from './banlist.page';

describe('BanlistPage', () => {
  let component: BanlistPage;
  let fixture: ComponentFixture<BanlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
