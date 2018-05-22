import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {ComponentService} from './parqueadero.service';
import { Parqueadero } from './model/Parqueadero';
import { Vehiculo } from './model/vehiculo';





@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css'],
  providers: [NgbTabsetConfig,ComponentService]
})

export class ParqueaderoComponent implements OnInit {

  parqueadero:any = new Parqueadero;
  parqueaderoConsultado:any = {};
  ingresarVehiculo:Vehiculo = new Vehiculo;
  

  consultaPlaca:String="";
  mostrarTabla:boolean = false;
  consultaSalida:boolean = false;

  constructor(config: NgbTabsetConfig, private service:ComponentService) { 
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit() {
  }

  listar(){
    this.service.listar().then(data => {
      this.parqueadero=data;
      this.mostrarTabla = true;
    },error => console.log(error.error.message))
  }

  limpiar(){
    this.parqueadero = null;
    this.mostrarTabla=false;
  }

  consultar(){
    this.service.consultar(this.consultaPlaca).then(data=>{
      if(data!=null){
        this.parqueaderoConsultado = data;
        this.consultaSalida = true;
      }
    },error =>  alert("El vehiculo no se encuentra dentro del parqueadero, favor verificar"))    
  }

  guardar(){
    this.service.guardar(this.ingresarVehiculo).then(data=>{
      if(data){
        this.ingresarVehiculo.placa="";
        this.ingresarVehiculo.tipoVehiculo="NoSelect";
        this.ingresarVehiculo.cilindraje=null;
        alert("Se guardo correctamente");
      }
    
    },error => console.log(error.error.message))
  }

}
