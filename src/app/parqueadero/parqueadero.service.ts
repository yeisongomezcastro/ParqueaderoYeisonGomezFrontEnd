import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehiculo } from './model/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(private httpClient:HttpClient) {   }
  listar(){
    return  this.httpClient.get('http://localhost:8080/servicio/listar').toPromise();
  }

  consultar(placa:String){
    return  this.httpClient.get('http://localhost:8080/servicio/registrarsalidavehiculo/' + placa).toPromise();
  }

  guardar(vehiculo:Vehiculo){
    return  this.httpClient.post<any>('http://localhost:8080/servicio/registraringresovehiculo', vehiculo).toPromise();
  }

}
