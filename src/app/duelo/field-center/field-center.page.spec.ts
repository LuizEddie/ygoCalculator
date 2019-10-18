import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCenterPage } from './field-center.page';

describe('FieldCenterPage', () => {
  let component: FieldCenterPage;
  let fixture: ComponentFixture<FieldCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
