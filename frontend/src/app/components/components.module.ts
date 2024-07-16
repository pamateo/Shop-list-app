import { HistorialComponent } from './historial/historial.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ResumenHistorialComponent } from './resumen-historial/resumen-historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialDetallesComponent } from './historial-detalles/historial-detalles.component';



@NgModule({
  declarations: [
    ResumenHistorialComponent,
    HistorialComponent,
    HistorialDetallesComponent
  ],
  providers:[
    DatePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
