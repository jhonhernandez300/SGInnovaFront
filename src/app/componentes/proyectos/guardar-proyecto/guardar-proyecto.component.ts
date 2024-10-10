import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../../servicios/proyecto.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../general/confirm-dialog/confirm-dialog.component';
import { CloseDialogComponent } from '../../general/close-dialog/close-dialog.component';
import { iProyectoSinIdDTO } from '../../../interfaces/iProyectoSinIdDTO';

@Component({
  selector: 'app-guardar-proyecto',
  templateUrl: './guardar-proyecto.component.html',
  styleUrl: './guardar-proyecto.component.css'
})
export class GuardarProyectoComponent implements OnInit{
  myForm!: FormGroup; 
  submitted = false;   
  
  constructor(
    private formBuilder: FormBuilder,
    private proyectoService: ProyectoService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {       
  }

  private initializeForm(): void {
    const today = new Date(); 
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); 
  
    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      fechaInicio: [today], 
      fechaFinalizacion: [tomorrow] 
    });
  }

  public onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  public async onSubmit(): Promise<void> {
    this.submitted = true;    
    console.log("Form value ", this.myForm.value);        

    if (this.myForm.invalid) {
      //console.log('Error de validación')          
      this.dialog.open(CloseDialogComponent, {            
        data: { message: "Revisa los valores del formulario" } 
      });
      return;
    }             

    const formData = {
      ...this.myForm.value,
      fechaInicio: this.myForm.value.fechaInicio ? new Date(this.myForm.value.fechaInicio) : null,
      fechaFinalizacion: this.myForm.value.fechaFinalizacion ? new Date(this.myForm.value.fechaFinalizacion) : null
    };
    
    this.proyectoService.GuardarProyectoAsync(this.myForm.value).subscribe({
      next: (response: any) => {
          //console.log('response', response);
          this.dialog.open(CloseDialogComponent, {            
            data: { message: "Proyecto creado" } 
          });
          this.myForm.reset();
          this.router.navigate(['/obtener-todos-proyectos']); 
      },
      error: (error: any) => {
          //console.error('Request error:', error);
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