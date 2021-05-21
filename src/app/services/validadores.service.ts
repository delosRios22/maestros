import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  listMaestros:any = {}
  constructor() { }

  saveMaestro(data){    
    this.listMaestros = {
      nombre: data.name.value,
      identificacion: data.identification_number.value,
      telefono: data.phone.value,
      direccion: data.address.value.barrio,
    }
    return {listMaestros : this.listMaestros, status: true};

  }
}
