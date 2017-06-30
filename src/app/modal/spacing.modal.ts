import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators,AbstractControl } from '@angular/forms';
import { RValueService } from '../Services/RValueService';


@Component({
    selector:'spacing-modal',
    templateUrl: './spacing.modal.html',
     styleUrls: ['./spacing.modal.css']
})

export class SpacingModal implements OnInit{
  closeResult: string;
  fullImagePath = '/assets/images/uval.PNG'

  constructor(private modalService: NgbModal,private fb:FormBuilder ) {
  
  }


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
inputsForm:FormGroup;

selectedInput:string;
Spacing:number; 
DLarge:number; Length:number;CInsulation:number;cavityThickness:number;

@Output()
passData:EventEmitter<Object> = new EventEmitter();

setValues(){
    this.passData.emit({Spacing:this.Spacing,DLarge:this.DLarge,Insulation:this.CInsulation,Length:this.Length,cavityThick:this.cavityThickness})
}
 checkSpacing(control:FormControl){

  if(control.value==16 || control.value==24){
    return{validSpacing:false};
  }
  return {validSpacing:true};
}
checkDLarge(control:FormControl){
  if(control.value==3.5 || control.value==4 || control.value==6){
    return {validD:false}
  }
  else{
    return {validD:true}
  }
}
  
ngOnInit(): void {
this.inputsForm=this.fb.group({
  Spacing: [this.Spacing, [Validators.required,this.checkSpacing]],
  DLarge:[this.DLarge,[Validators.required,this.checkDLarge]],
  CInsulation:[this.CInsulation,[Validators.required]],
  Length:[this.Length,[Validators.required]],
  cavityThickness:[this.cavityThickness,[Validators.required]]
})
}
}