import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iProyecto } from '../interfaces/iProyecto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iTareaConUsuarioDTO } from '../interfaces/iTareaConUsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'https://localhost:7136/api/Proyectos'; 

  constructor(private http: HttpClient) { }

  BorrarProyectoAsync(id: number): Observable<any> {             
    return this.http.delete(`${this.apiUrl}/BorrarProyectoAsync` + "/" + id).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }

  ObtenerTodosLosProyectosAsync(): Observable<any> {             
    return this.http.get(`${this.apiUrl}/ObtenerTodosLosProyectosAsync`).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }
}
