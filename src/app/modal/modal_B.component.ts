import { Component, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector:'modal-B',
    templateUrl: './modal_B.component.html',
     styles: [`
     .layer-B{position:absolute; bottom:55px;}
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
     `]
})

export class Modal_BComponent{
  closeResult: string;

  constructor(private modalService: NgbModal) {}

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
  BThickness:number;
  BResistivity
  @Output()
  passLayer:EventEmitter<Object> = new EventEmitter();
  @Output()
  passThickness:EventEmitter<number> = new EventEmitter();
  @Output()
  addMaterial:EventEmitter<number> = new EventEmitter();

  passValues(){
  this.passLayer.emit({layer:'B', thickness:this.BThickness, Resistivity:this.BResistivity});  

  }

}