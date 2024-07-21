import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/services/historial.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent  implements OnInit {

  public historiales=[];
  public historialesFiltrados=[];
  public ordenadoDesc:boolean=true;

  constructor(private router:Router,
              private historialService:HistorialService,
              private toast:ToastService) { 
  }
  
  ngOnInit() {
    this.cargarHistoriales();

  }

  home(){
    this.router.navigate(['/home']);
  }

  cargarHistoriales(){
    this.historialService.getHistoriales().subscribe({
      next:res=>{
        if(res){
          this.historiales=res['historial'];
          this.historialesFiltrados=this.historiales;
        }
      },
      error:err=>{
        if(err){
          console.log(err);
        }
      }
    })

  }
  
  deleteHistorial(uid){
    this.historialService.deleteHistorial(uid).subscribe({
      next:res=>{
        if(res){
          this.toast.mostrarToast('Historial borrado correctamente', 'success', 1000);
          this.cargarHistoriales();
        }
      },
      error:err=>{
        if(err){
          this.toast.mostrarToast('Error borrando el historial', 'danger', 1000);
        }
      }
    })
  }
  sort(){
    if(this.ordenadoDesc){
      this.historialesFiltrados.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }else{
      this.historialesFiltrados.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }
    this.ordenadoDesc=!this.ordenadoDesc;
  }

  buscarHistorial(event){
    const busqueda=event.target.value.toLowerCase();
    if(busqueda && busqueda.trim() !== ''){
      this.historialesFiltrados=this.historiales.filter(historial=>historial.nombre.toLowerCase().includes(busqueda));
    } else{
      this.historialesFiltrados=this.historiales;
    }
  }

  mostrarDetalles(uid){
    this.router.navigate(['/detalles'], {queryParams:{uid}})
  }
  
}
