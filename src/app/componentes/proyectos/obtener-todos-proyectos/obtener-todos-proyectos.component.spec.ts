import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerTodosProyectosComponent } from './obtener-todos-proyectos.component';

describe('ObtenerTodosProyectosComponent', () => {
  let component: ObtenerTodosProyectosComponent;
  let fixture: ComponentFixture<ObtenerTodosProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObtenerTodosProyectosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObtenerTodosProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
