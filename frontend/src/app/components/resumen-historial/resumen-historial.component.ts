import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { HistorialService } from 'src/app/services/historial.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-resumen-historial',
  templateUrl: './resumen-historial.component.html',
  styleUrls: ['./resumen-historial.component.scss'],
})
export class ResumenHistorialComponent implements OnInit {


  public historialForm;
  public productos=[];
  constructor(private modalCtrl: ModalController,
              private navParams:NavParams,
              private historial:HistorialService,
              private toast:ToastService,
              private fb:FormBuilder
  ) {}


  ngOnInit(): void {
    this.productos=this.navParams.get('comprados');
    this.historialForm=this.fb.group({
      nombre:['', Validators.required],
      precio:[null,Validators.required]
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  confirm() {
    if(this.historialForm.valid){
      const data=[];
      data.push(this.productos, this.historialForm.get('precio').value, this.historialForm.get('nombre').value);
      this.historial.crearHistorial(data).subscribe({
        next:res=>{
          if(res){
            return this.modalCtrl.dismiss([this.historialForm.get('precio').value, this.historialForm.get('nombre').value], 'confirm');
          }
        },
        error:err=>{
          if(err){
            console.log(err);
            this.toast.mostrarToast('Ha ocurrido un error en la compra', 'danger', 1000);
          }
        }
      })
    }

  }

}
