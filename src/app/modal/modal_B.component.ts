import { Component, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RValueService } from '../Services/RValueService';

@Component({
    selector:'modal-B',
    templateUrl: './modal.component.html',
      styles: [`
     .add-layer{position:absolute; bottom:55px;}
      input[type=number]{
      margin-bottom: 10px;
      }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
 
}
.add-layer button{
    border-radius: 50%;
}
@media only screen and (max-width: 770px){
    .add-layer{
    margin-top:10px;
    bottom:0px;
     margin-bottom: 30px;
    position:relative;
}
 }
     `]
})

export class Modal_BComponent{
  closeResult: string;
  rValues:any;  layerName:string;
  constructor(private modalService: NgbModal,private rValueService:RValueService) {
      this.rValues=this.rValueService.getData();
      console.log(this.rValues)
  }
  selectedValue:number;
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  selected:boolean=false;
  AThickness:number;
  AResistivity:number;
  @Output()
  passLayer:EventEmitter<Object> = new EventEmitter();
  @Output()
  passThickness:EventEmitter<number> = new EventEmitter();
  @Output()
  addMaterial:EventEmitter<number> = new EventEmitter();

  passValues(){
    if(this.selectedValue){
    this.passLayer.emit({layer:'B', thickness:this.AThickness,Resistivity:this.selectedValue});  
    this.addMaterial.emit();
  }
    else{
      this.passLayer.emit({layer:'B', thickness:this.AThickness,Resistivity:this.AResistivity,name:this.layerName});  
      this.addMaterial.emit();
    }
    this.selected=false;
    this.selectedValue=null;
  
  }
  reset(){
     this.selected=false;
    this.selectedValue=null;
  }
   toNumber(){
    this.selectedValue = +this.selectedValue;
    console.log(this.selectedValue);
    this.selected=true
  }
}