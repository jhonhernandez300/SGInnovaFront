import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iProyecto } from '../interfaces/iProyecto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'https://localhost:7136/api/Proyectos'; 

  constructor(private http: HttpClient) { }

  ActualizarProyecto(proyecto: iProyecto): Observable<any> {             
    return this.http.put(`${this.apiUrl}/ActualizarProyecto/${proyecto.proyectoId}`, proyecto).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }

  GuardarProyectoAsync(proyecto: iProyecto): Observable<any> {         
    console.log(proyecto);
    return this.http.post(`${this.apiUrl}/GuardarProyectoAsync`, proyecto).pipe(
      catchError(error => {
          console.error('Request error:', error);
          return throwError(error);
      })    
    );    
  }

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
