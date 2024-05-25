import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaDevolucionComponent } from './renta-devolucion.component';

describe('RentaDevolucionComponent', () => {
  let component: RentaDevolucionComponent;
  let fixture: ComponentFixture<RentaDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentaDevolucionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentaDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
