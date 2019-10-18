import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicoPage } from './classico.page';

describe('ClassicoPage', () => {
  let component: ClassicoPage;
  let fixture: ComponentFixture<ClassicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
