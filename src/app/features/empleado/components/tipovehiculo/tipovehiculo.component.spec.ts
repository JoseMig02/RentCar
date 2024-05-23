import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipovehiculoComponent } from './tipovehiculo.component';

describe('TipovehiculoComponent', () => {
  let component: TipovehiculoComponent;
  let fixture: ComponentFixture<TipovehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipovehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipovehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
