import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http:HttpClient) { }

  crearHistorial(data:any){
    const productosId=data[0].map(producto=>producto.uid);
    console.log(productosId);
    const datos={
      precio:data[1],
      nombre:data[2],
      productos:productosId
    }
    console.log('datos del historial: ',datos);
    return this.http.post(`${environments.historialUrl}`, datos);
  }

  deleteHistorial(uid:string){
    return this.http.delete(`${environments.historialUrl}/${uid}`)
  }

  getHistoriales(uid?:string){
    if(uid){
      return this.http.get(`${environments.historialUrl}/?id=${uid}`);
    }else{
      return this.http.get(`${environments.historialUrl}`)
    }
  }
}
