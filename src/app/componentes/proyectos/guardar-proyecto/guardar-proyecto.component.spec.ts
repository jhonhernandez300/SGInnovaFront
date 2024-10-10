import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarProyectoComponent } from './guardar-proyecto.component';

describe('GuardarProyectoComponent', () => {
  let component: GuardarProyectoComponent;
  let fixture: ComponentFixture<GuardarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuardarProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
