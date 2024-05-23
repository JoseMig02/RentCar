import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloComponent } from './modelo.component';

describe('ModeloComponent', () => {
  let component: ModeloComponent;
  let fixture: ComponentFixture<ModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
