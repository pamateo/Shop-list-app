import { Component } from '@angular/core';
import { TareasService } from '../services/tareas.service';

import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { AlertController, ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { HistorialService } from '../services/historial.service';
import { ResumenHistorialComponent } from '../components/resumen-historial/resumen-historial.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  public tareas=[];
  public productosComprados=[];
  public comprado:boolean=false;


  public tareaForm=this.fb.group({
    nombre: ['', Validators.required],
    completada:[false, Validators.required]
  });

  constructor(private tareasService:TareasService, 
              private toastService:ToastService, 
              private fb:FormBuilder,
              private modalCtrl:ModalController,
              private historial:HistorialService) {
    this.getTareas();
    this.getTareasCompletadas();
    
  }


  getTareasCompletadas(){
    return this.tareasService.getTareasCompletadas().subscribe({
      next:res=>{
        if(res){
          this.productosComprados=res['tareas'];
          console.log(this.productosComprados);
        }
      },
      error:err=>{
        console.log(err);
        this.toastService.mostrarToast('Error obteniendo los productos', 'danger',2000);
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
          this.toastService.mostrarToast('No se ha podido borrar el producto. Intentalo mas tarde', 'danger',2000);
        }
      }
    })
  }
  
  crearTarea(){
    if(this.tareaForm.pristine){
    this.toastService.mostrarToast('Completa el formulario antes de añadir el producto.', 'danger',2000);
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
          this.toastService.mostrarToast('No se ha podido añadir el producto. Intentalo mas tarde', 'danger',2000);
        }
      }
    })
  }
 }

 marcarCompletada(event, index, uid){
    
  if(event.detail.checked){
    console.log(event.detail);
    const tarea=this.tareas[index];
    console.log(tarea);
    tarea.completada=!tarea.completada
      
    console.log('llego a check');
    
    this.tareasService.marcarCompletada(uid,tarea.completada).subscribe({
        next:res=>{
          if(res){
            this.getTareas();
            this.getTareasCompletadas();
          }
            
          },
          error:err=>{
            tarea.completada=!tarea.completada;
            this.toastService.mostrarToast('Error comprando el producto', 'danger', 1000);
        }
      })  
      
    }else{
      this.tareasService.marcarCompletada(uid,false).subscribe({
          next:res=>{
              this.getTareas();
              this.getTareasCompletadas();
              
            },
            error:err=>{
              this.toastService.mostrarToast('Error comprando el producto', 'danger', 1000);
          }
        })  

  }

 }

 handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
  // The `from` and `to` properties contain the index of the item
  // when the drag started and ended, respectively
  console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

  // Finish the reorder and position the item in the DOM based on
  // where the gesture ended. This method can also be called directly
  // by the reorder group
  ev.detail.complete();
}

  async mostrarResumen(comprados){
    console.log(comprados);

    const modal=await this.modalCtrl.create({
      component:ResumenHistorialComponent,
      componentProps:{
        comprados:comprados
      }
    })

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.toastService.mostrarToast('Compra finalizada correctamente', 'success', 1000);
      
    }

    
  }

}
