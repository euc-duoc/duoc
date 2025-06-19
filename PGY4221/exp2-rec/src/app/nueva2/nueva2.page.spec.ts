import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nueva2Page } from './nueva2.page';

describe('Nueva2Page', () => {
  let component: Nueva2Page;
  let fixture: ComponentFixture<Nueva2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Nueva2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
