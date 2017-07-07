import { Component, Output, EventEmitter, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RValueService } from '../Services/RValueService';

@Component({
    selector:'app-modal',
    templateUrl: './modal.component.html',
     styleUrls: ['./modal.component.css']
})

export class ModalComponent{
  @Input()
  count:number=1;
  closeResult: string;
  rValues:any;
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
    this.passLayer.emit({layer:'A', thickness:this.AThickness,Resistivity:this.selectedValue});  
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
    // alert()
  
  }
   toNumber(layer){
      // alert(layer)
    this.selectedValue = +this.selectedValue;
    console.log(this.selectedValue);
    this.selected=true
  
  }

}