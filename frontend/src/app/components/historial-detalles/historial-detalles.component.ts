import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HistorialService } from 'src/app/services/historial.service';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.component.html',
  styleUrls: ['./historial-detalles.component.scss'],
})
export class HistorialDetallesComponent  implements OnInit {

  constructor(private router:Router,
              private route:ActivatedRoute,
              private historialService:HistorialService,
              private producto:TareasService
  ) { }

  public uid:string;
  public historial;
  public productos:string[]=[];

  async ngOnInit() {
    this.uid=this.route.snapshot.queryParams['uid'];
    await this.cargarHistorial();
    await this.cargarProductos();
    console.log(this.productos);
  }


  async cargarHistorial(){
    try {
      const res= await firstValueFrom(this.historialService.getHistoriales(this.uid));
      if(res){
        this.historial=res['historial'];
        console.log(this.historial);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async cargarProductos(){
    for (let index = 0; index < this.historial.productos.length; index++) {
      this.producto.getProcuto(this.historial.productos[index]).subscribe({
        next:res=>{
          if(res){
            this.productos.push(res['tareas']);
            // console.log(this.productos);
          }
        }
      })
    }
  }


  volver(){
    this.router.navigate(['/historial']);
  }
}
