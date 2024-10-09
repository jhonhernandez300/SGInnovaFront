import { Component, OnInit, ViewChild } from '@angular/core';
import { iProyecto } from '../../../interfaces/iProyecto';
import { ProyectoService } from '../../../servicios/proyecto.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../../general/close-dialog/close-dialog.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TareaTransferService } from '../../../servicios/tarea-transfer.service';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'app-obtener-todos-proyectos',
  templateUrl: './obtener-todos-proyectos.component.html',
  styleUrl: './obtener-todos-proyectos.component.css'
})
export class ObtenerTodosProyectosComponent implements OnInit {
  dataSource = new MatTableDataSource<iProyecto>([]); 
  errorMessage: string = '';  
  showDiv = false;  
  userChoice = false;
  rol: string = '';
  displayedColumns: string[] = ['nombre', 'descripcion', 'fechaInicio', 'fechaFinalizacion', 'delete', 'update'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(
    private router: Router,    
    private proyectoService: ProyectoService, 
    public dialog: MatDialog,
    public tareaTransferService: TareaTransferService,
    private usuarioService: UsuarioService
    // private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
     //this.rol = this.usuarioService.ObtenerRol();
     this.rol =  "Administrador";
    this.loadAllProjects();
  }

  public loadAllProjects(): void {
    this.proyectoService.ObtenerTodosLosProyectosAsync().subscribe(
      (response: any) => {        
        if (response.message != "Proyectos obtenidos exitosamente.") {
          this.handleEmpty(response.data);
        } else {                     
        this.dataSource.data = response.proyectos;         
          // Conecta el paginador
          this.dataSource.paginator = this.paginator; 
          
          if(this.rol == "Empleado"){
            //const id = Number(this.sessionStorageService.getData("id"));
            const id = 1;
            this.dataSource.data = response.data.filter((proyecto: iProyecto) => proyecto.proyectoId === id);
          }                    
        }
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  update(proyecto: iProyecto) {
    // this.tareaTransferService.changeTarea(tarea);
    // //console.log("update", tarea);
    // this.router.navigate(['/actualizar-proyecto']);        
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.userChoice = result;  
      if (this.userChoice) {
        this.deleteTarea(id);
      }
    });
  }

  deleteTarea(id: number): void {        
    this.proyectoService.BorrarProyectoAsync(id).subscribe(
      (response: any) => {
        if (response.message != "Proyecto borrado exitosamente") {
          this.dialog.open(CloseDialogComponent, {
            data: { message: response.message } 
          });
        } else {          
          this.dialog.open(CloseDialogComponent, {            
            data: { message: "Proyecto borrado" } 
          });
          this.updateTareas(id);
        }
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  private updateTareas(id: number): void {        
    this.dataSource.data = this.dataSource.data.filter(proyectos => proyectos.proyectoId !== id);    
  }

  private handleEmpty(message: string): void {
    this.errorMessage = message;
    this.showTemporaryDiv();
  }

  private showTemporaryDiv(): void {
    this.showDiv = true;
    setTimeout(() => this.showDiv = false, 5000);
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.errorMessage = error;
    this.showTemporaryDiv();
  }
}

