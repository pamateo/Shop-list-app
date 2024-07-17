import { HistorialComponent } from './historial/historial.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ResumenHistorialComponent } from './resumen-historial/resumen-historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResumenHistorialComponent,
    HistorialComponent,
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
