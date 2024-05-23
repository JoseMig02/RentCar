import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaListComponent } from './marca-list.component';

describe('MarcaListComponent', () => {
  let component: MarcaListComponent;
  let fixture: ComponentFixture<MarcaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarcaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
