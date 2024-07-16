import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HistorialService } from 'src/app/services/historial.service';

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.component.html',
  styleUrls: ['./historial-detalles.component.scss'],
})
export class HistorialDetallesComponent  implements OnInit {

  constructor(private router:Router,
              private route:ActivatedRoute,
              private historialService:HistorialService
  ) { }

  public uid:string;
  public historial;

  async ngOnInit() {
    this.uid=this.route.snapshot.queryParams['uid'];
    await this.cargarHistorial();
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
  volver(){
    this.router.navigate(['/historial']);
  }
}
