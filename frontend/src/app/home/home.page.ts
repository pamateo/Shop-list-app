import { Component } from '@angular/core';
import { TareasService } from '../services/tareas.service';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public tareas=[];
  public tareasCompletadas=[];
  public comprado:boolean=false;


  public tareaForm=this.fb.group({
    nombre: ['', Validators.required],
    completada:[false, Validators.required]
  });

  constructor(private tareasService:TareasService, private toastService:ToastService, private router:Router, private fb:FormBuilder) {
    this.getTareas();
    this.getTareasCompletadas();
    
  }

  getTareasCompletadas(){
    return this.tareasService.getTareasCompletadas().subscribe({
      next:res=>{
        if(res){
          this.tareasCompletadas=res['tareas'];
          console.log(this.tareasCompletadas);
        }
      },
      error:err=>{
        console.log(err);
        this.toastService.mostrarToast('Error obteniendo las tareas', 'danger',2000);
      }
    })
  }


  getTareas(){
    return this.tareasService.getTareas().subscribe({
      next:res=>{
        if(res){
          this.tareas=res['tareas'];
        }
      },
      error:err=>{
        console.log(err);
        this.toastService.mostrarToast('Error obteniendo las tareas', 'danger',2000);
      }
    })
  }
 

  deleteTarea(uid:string){
    return this.tareasService.deleteTarea(uid).subscribe({
      next:res=>{
        if(res){
        this.toastService.mostrarToast('Producto borrado con éxito', 'success', 1000);
          this.getTareas();
          this.getTareasCompletadas();
        }
      },
      error:err=>{
        if(err){
          this.toastService.mostrarToast('No se ha podido borrar la tarea. Intentalo mas tarde', 'danger',2000);
        }
      }
    })
  }
  
  crearTarea(){
    if(this.tareaForm.pristine){
    this.toastService.mostrarToast('Completa el formulario antes de crear la tarea.', 'danger',2000);
    return;
  }else{
    this.tareasService.crearTarea(this.tareaForm.value).subscribe({
      next:res=>{
        if(res){
          this.tareaForm.markAsPristine();
          this.tareaForm.reset();
          this.getTareas();
          
        }
      },
      error:err=>{
        if(err){
          this.toastService.mostrarToast('No se ha podido crear la tarea. Intentalo mas tarde', 'danger',2000);
        }
      }
    })
  }
 }

 marcarCompletada(index, uid){
    const tarea=this.tareas[index]
console.log(tarea);
tarea.completada=!tarea.completada
  
console.log('llego a check');

this.tareasService.marcarCompletada(uid,tarea.completada).subscribe({
    next:res=>{
        this.toastService.mostrarToast('Tarea Completada', 'success', 1000);
        this.getTareas();
        this.getTareasCompletadas();
        
      },
      error:err=>{
        tarea.completada=!tarea.completada;
        this.toastService.mostrarToast('No se ha podido completar la tarea', 'danger', 1000);
    }
  })
 }
}
