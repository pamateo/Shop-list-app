import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor(private toastController:ToastController) { }

async mostrarToast(mensaje:string, color:string, duration:number){
  let toast;

  switch(color){
    case 'danger':
      toast=await this.toastController.create({
        message:mensaje,
        color:'danger',
        duration
      });
      break;
    case 'success':
      toast=await this.toastController.create({
        message:mensaje,
        color:'success',
        duration
      });
      break;
      case 'warning':
        toast=await this.toastController.create({
          message:mensaje,
          color:'warning',
          duration
        });
        break;
        default:
          break;
  }
  await toast.present();
}
}
