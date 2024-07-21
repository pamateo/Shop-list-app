import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';




@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http:HttpClient) { }

  getTareas(){
    return this.http.get(`${environments.baseUrl}/?completadas=false`);
  }
  
  getTareasCompletadas(){
    return this.http.get(`${environments.baseUrl}?completadas=true`);
  }
  
  getProcuto(uid){
    return this.http.get(`${environments.baseUrl}?id=${uid}`);
  }

  deleteTarea(uid:string){
    return this.http.delete(`${environments.baseUrl}/${uid}`);
  }

  marcarCompletada(uid, accion:boolean){
    if(!uid){uid=''}
    const data={completada:accion};
    return this.http.put(`${environments.baseUrl}/${uid}`, data);
  }

  crearTarea(data:any){
    const datos:FormData=new FormData();
    datos.append('nombre', data.nombre);
    datos.append('completada', data.completada);

    return this.http.post(`${environments.baseUrl}`, data);
  }
}
