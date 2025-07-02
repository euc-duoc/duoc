import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotaDetallePage } from './mascota-detalle.page';

describe('MascotaDetallePage', () => {
  let component: MascotaDetallePage;
  let fixture: ComponentFixture<MascotaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
