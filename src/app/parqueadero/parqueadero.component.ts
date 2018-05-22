import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbTabsetConfig,NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {ComponentService} from './parqueadero.service';
import { Parqueadero } from './model/Parqueadero';
import { Vehiculo } from './model/vehiculo';





@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `],
  providers: [NgbTabsetConfig,ComponentService]
})

export class ParqueaderoComponent implements OnInit {
  closeResult: string;

  parqueadero:any = new Parqueadero;
  parqueaderoConsultado:any = {};
  ingresarVehiculo:Vehiculo = new Vehiculo;
  

  consultaPlaca:String="";
  mensajeListar:String="";
  mostrarMensajeListar:boolean = false;
  mostrarTabla:boolean = false;
  consultaSalida:boolean = false;

  constructor(config: NgbTabsetConfig, private service:ComponentService,private modalService: NgbModal) { 
    config.justify = 'center';
    config.type = 'pills';
  }

  ngOnInit() {
  }


  lanzarModal(content){
    if(this.consultaPlaca==""){
      alert("Favor digite la placa.");
    }

    if(this.consultaPlaca!=""){
        this.consultar();
        this.openVerticallyCentered(content);
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    this.consultaPlaca="";
    }

  listar(){
    this.service.listar().then(data => {
      this.parqueadero=data;
      if(this.parqueadero){
        this.mostrarTabla = true;
      }
    },error => {
      console.log(error.error.message);
      alert(error.error);
    }
  )
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
        this.mensajeListar = "";
      this.mostrarMensajeListar=false;

      }
    },error =>  {
      console.log(error.error);
      this.mostrarTabla = false;
      this.mensajeListar = error.error;
      this.mostrarMensajeListar=true;
    }
  )    
  }

  guardar(){
    this.service.guardar(this.ingresarVehiculo).then(data=>{
      if(data){
        this.ingresarVehiculo.placa="";
        this.ingresarVehiculo.tipoVehiculo="NoSelect";
        this.ingresarVehiculo.cilindraje=null;
        alert("El vehiculo se guardo correctamente");
      }
    
    },error =>{
      console.log(error.error.message);
        alert(error.error);
    } )
  }

}
