import { Component, OnInit } from '@angular/core';
import { ProyectoTransferService } from '../../../servicios/proyecto-transfer.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../../general/close-dialog/close-dialog.component';
import { iProyecto } from '../../../interfaces/iProyecto';
import { ProyectoService } from '../../../servicios/proyecto.service';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrl: './actualizar-proyecto.component.css'
})
export class ActualizarProyectoComponent implements OnInit{
  proyecto: iProyecto | null = null;
  myForm!: FormGroup;
    submitted = false;
  //selectedUsuarioId!: number;      
  
  constructor(
    private proyectoTransferService: ProyectoTransferService,    
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router,
    public dialog: MatDialog
  ){this.initializeForm();}

  ngOnInit(): void {
    this.obtenerProyectoAEditar();      
  }  

  obtenerProyectoAEditar(): void{
  this.proyectoTransferService.currentProject.subscribe(proyecto => {
     
    if(proyecto != null){
      this.proyecto = proyecto;            
      this.myForm.patchValue(proyecto);          
    }      
  });
}

private initializeForm(): void {
  this.myForm = this.formBuilder.group({
    proyectoId: [this.proyecto?.proyectoId],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    fechaInicio: [''], 
    fechaFinalizacion: [''] 
  });
}
  
  public onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  public async onSubmit(): Promise<void> {
    this.submitted = true;       

    if (this.myForm.invalid) {    
      this.dialog.open(CloseDialogComponent, {            
        data: { message: "Revise los valores del formulario" } 
      });
      return;
    }             
    
    this.proyectoService.ActualizarProyecto(this.myForm.value).subscribe({
      next: (response: any) => {
          //console.log('response', response);
          this.dialog.open(CloseDialogComponent, {            
            data: { message: "Proyecto actualizado" } 
          });
          this.myForm.reset();
          this.router.navigate(['/obtener-todos-proyectos']);
      },
      error: (error: any) => {
          console.error('Error en el componente:', error);
          this.dialog.open(CloseDialogComponent, {            
            data: { message: error } 
          });
      }
  });     
  }

  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }
}
