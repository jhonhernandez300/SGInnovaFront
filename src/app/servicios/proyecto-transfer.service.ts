import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iProyecto } from '../interfaces/iProyecto'; 

@Injectable({
  providedIn: 'root'
})
export class ProyectoTransferService {
  private projectSource = new BehaviorSubject<iProyecto | null>(null);
  currentProject = this.projectSource.asObservable();

  constructor() { }

  changeProject(proyecto: iProyecto) {
    //console.log("En el transfer service ", employee);
    this.projectSource.next(proyecto);
  }
}
