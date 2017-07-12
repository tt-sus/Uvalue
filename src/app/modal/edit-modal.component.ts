import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RValueService } from '../Services/RValueService';


@Component({
    selector:'edit-modal',
    templateUrl: './editmodal.component.html',
     styleUrls: ['./modal.component.css']
})

export class EditModalComponent{
  @ViewChild('layer') input; 
  @Input()
  count:number=1;
  closeResult: string;
  rValues:any;
  name:string;
  constructor(private modalService: NgbModal,private rValueService:RValueService) {
      this.rValues=this.rValueService.getData();
      console.log(this.rValues)
  }
  selectedlayer:{Material:"",rvalue:number};
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
  layerName:string;
  @Output()
  passLayer:EventEmitter<Object> = new EventEmitter();
  @Output()
  addMaterial:EventEmitter<number> = new EventEmitter();
  
getName(){
  // alert("yo")
}
  passValues(){
  
      this.count++;
    if(this.selectedValue){
    this.passLayer.emit({layer:'A', thickness:this.AThickness,Resistivity:this.selectedValue,name:this.name});  
    this.addMaterial.emit();
   

  }
    else{
      this.passLayer.emit({layer:'A', thickness:this.AThickness,Resistivity:this.AResistivity,name:this.layerName});  
      this.addMaterial.emit();
    }
    this.selected=false;
    this.selectedValue=null;
  
  }
  reset(){
    this.AThickness=null;
    this.AResistivity=null;
    this.selected=false;
    this.selectedValue=null;
  
    // alert()
  
  }
   toNumber(layer){
      // alert(layer)   
      console.log(this.selectedlayer);
      this.selectedValue = this.selectedlayer.rvalue;
        this.name=this.selectedlayer.Material;
    this.selected=true
  
  }

}