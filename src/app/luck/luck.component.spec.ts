import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckComponent } from './luck.component';

describe('LuckComponent', () => {
  let component: LuckComponent;
  let fixture: ComponentFixture<LuckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuckComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
