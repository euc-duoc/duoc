import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nueva3Page } from './nueva3.page';

describe('Nueva3Page', () => {
  let component: Nueva3Page;
  let fixture: ComponentFixture<Nueva3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Nueva3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
