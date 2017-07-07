import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { UValueService } from '../Services/Uvalue.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SpacingModal } from '../modal/spacing.modal';

import { ReferencePopover } from '../popovers/referencePop';

@Component({
  selector: 'app-uvalue',
  templateUrl: './uvalue.component.html',
  styleUrls: ['./uvalue.component.css']
})
export class UValueComponent implements OnInit {
  showCavity: boolean;
  fullImagePath = '/assets/images/insulation.png'
// Lookup Data
  lookUp:any;
  constructor(private uValueService:UValueService) {
    this.lookUp=uValueService.getData()
  }

  
  layerType:string="";
   //display material info
  showlayer:number=1;
  // layercounters
  countUp:number=0; 
  countDown:number=1;
  //user inputs
  CMA1=0; CTA1=0; CRA1=0;
  CMA2=0; CTA2=0; CRA2=0;
  CMA3=0; CTA3=0; CRA3=0;
  CMA4=0; CTA4=0; CRA4=0;
  CMB1=0; CTB1=0.625; CRB1=1.2;
  CMB2=0; CTB2=0; CRB2=0;
  CMB3=0; CTB3=0; CRB3=0;
  CMB4=0; CTB4=0; CRB4=0;
  CME=0;  CTE=0.625;  CRE=0.5;
  CMS=0;  CTS=0.023;  CRS=0.025;
  CMC=0;  CTC=6;  CRC=3.5;
  spacing:number=16; length:number=2.5; Dsmall:number=5.95; Dlarge:number=6;
  thickness:number=0.023; showLayerInfo:boolean; showR:boolean=false; film:boolean=true;unit:boolean=false;
  //internal inputs
  A; w; zf;Ra; Rb; 
  R1ins;R2ins;R1met;R2met;
  R1;R2; Ercav; Erw;RSheathingFinal:number;
  //outputs
  rWithoutFilm: number;
  rWithFilm:number;
  UWithFilm: number;
  UWithoutFilm: number;

  //layer names:
  layerA1:string;  layerA2:string;
  layerA3:string;  layerA4:string;
  layerB1:string;  layerB2:string;
  layerB3:string;  layerB4:string;
//function for adding layer through modals
@ViewChild(SpacingModal)
private child:SpacingModal;
 layer(message:any){
 
    if(message.layer=='A'){
    this.countUp++;
    this.deleteA=null;
    if(this.countUp==1){
      // alert('called 1')
      this.CTA1=message.thickness;
      this.CRA1=message.Resistivity;
      this.layerA1=message.name;
      //  alert(this.CTA1 + "and "+ this.CRA1)
    }
    if(this.countUp==2){
      // alert('called2')
      this.CTA2=message.thickness;
      this.CRA2=message.Resistivity;
       this.layerA2=message.name;
      // alert(this.CTA2 + "and "+ this.CRA2)
    }
    if(this.countUp==3){
      // alert('called 3')
      this.CTA3=message.thickness;
      this.CRA3=message.Resistivity;
       this.layerA3=message.name;
      // alert(this.CTA3 + "and "+ this.CRA3)
    }
    if(this.countUp==4){
      this.CTA4=message.thickness;
      this.CRA4=message.Resistivity;
       this.layerA4=message.name;
      // alert(this.CTA4 + "and "+ this.CRA4)
    }
     
    }
   if(message.layer=='B'){
      // alert("B added")
      this.countDown++;
      this.deleteB=null;
      if(this.countDown==2){
        this.CTB2=message.thickness;
        this.CRB2=message.Resistivity;
        this.layerB1=message.name
      }
      if(this.countDown==3){
        this.CTB3=message.thickness;
        this.CRB3=message.Resistivity;
        this.layerB2=message.name
      }
       if(this.countDown==4){
        this.CTB4=message.thickness;
        this.CRB4=message.Resistivity;
        this.layerB3=message.name
      }
    }
   this.calculate()
  }
  //layer count for showing added layers
  onSelectionChange(entry) {
    // clone the object for immutability
  //  alert("yes")
  }
showAInfo:number=0;;
showBInfo:number
   //edit layer
showA(n){
  this.showAInfo=n;
  this.showBInfo=null;
}   
showB(n){
  this.showBInfo=n;
  this.showAInfo=null;
} 
//delete layer
deleteB:number; deleteA:number;

deleteALayer(n){
this.deleteA=n;
this.showAInfo--;
this.countUp--;
if(n==2){
  this.CTA1=0; this.CRA1=0;
  // alert("called")
}
if(n==3){
  this.CTA2=0; this.CRA2=0;
}
if(n==4){
  this.CTA3=0; this.CRA3=0;
}
if(n==5){
  this.CTA4=0; this.CRA4=0;
}
this.calculate();
}
deleteBLayer(n){
this.deleteB=n;
this.showBInfo--;
this.countDown--;
if(n==2){
  this.CTB2=0; this.CRB2=0;
  // alert(n)
}
if(n==3){
  this.CTB3=0; this.CRB3=0;
  // alert(n)
}
if(n==4){
  this.CTB4=0; this.CRB4=0;
  // alert(n)
}
this.calculate();
}
//get the spacing data
  getData(message:any){
    this.showCavity=true;
    this.spacing=message.Spacing;
    this.length=message.Length;
    this.CTC=message.cavityThick;
    this.Dlarge=message.DLarge;
    this.CRC=message.Insulation;
    this.CTS=message.studThick;
    this.calculate();
  }
  //switch functionality
  toggleRtoU(){
    this.showR=!this.showR;
  }
    toggleFilm(){
    this.film=!this.film;
    this.check();
  }
  toggleUnit(){
    this.unit=!this.unit;
  }
// calculation for r value
   calculate(){
    // alert("calulcate called")
      let RSheathing = ((this.CRA1+this.CRA2+this.CRA3+this.CRA4 +this.CRE)/(this.countUp+1)/this.CRC);
      console.log(`
      CRA1=${this.CRA1}
      CRA2=${this.CRA2}
      CRA3=${this.CRA3}
      CRA4=${this.CRA4}
      CRE=${this.CRE}
      CRc=${this.CRC}
      `)
   //calculation for Rsheathing
     if(RSheathing<0.4){
       
        if(this.CRS<1.5){
           this.RSheathingFinal=10; 
        }
        else{
           this.RSheathingFinal=20; 
        }
       console.log( 'rsheathing is'+ this.RSheathingFinal)
     }
     else{
        this.RSheathingFinal=parseFloat(RSheathing.toFixed(1))
        // alert("this was called with"+this.RSheathingFinal)
     }

     for(let i=0;i<this.lookUp.length;i++){
       if(this.lookUp[i].r == this.RSheathingFinal && this.Dlarge == 6){
          this.zf=this.lookUp[i].zf[this.Dlarge]
          console.log(`zf is ${this.zf}`)
       }
       if(this.lookUp[i].r == this.RSheathingFinal && this.Dlarge == 4){
          this.zf=this.lookUp[i].zf[this.Dlarge]
       }
        if(this.lookUp[i].r == this.RSheathingFinal && this.Dlarge == 3.5){
         this.zf=this.lookUp[i].zf[this.Dlarge]
       }      
     }
     
     this.Dsmall= this.Dlarge-2*this.CTS;
     this.w=0;
     //internal calculations
     // calculation for a
     this.A=(this.CTA1 + this.CTA2+this.CTA3+this.CTA4 +this.CTE);
     console.log(`
      this.CTA1 is${this.CTA1} CTA2 is${this.CTA2} CTA3is ${this.CTA3} CTA4is ${this.CTA3} CTE is ${this.CTE}
      `)
     console.log("A is"+ this.A)
     //calculation for w
     this.w=this.length + (this.A)*this.zf;
     console.log(`zf is ${this.zf}`)
     console.log(`w is ${this.w}`);
     //calcution for Ra
     this.Ra= this.CTA1 * this.CRA1 + this.CTA2 * this.CRA2+this.CTA3*this.CRA3+this.CTA4+this.CRA4 +this.CTE*this.CRE;
     console.log(`Ra is ${this.Ra}`);
      //calcution for Rb
     this.Rb= this.CTB1 * this.CRB1 + this.CTB2 * this.CRB2+this.CTB3*this.CRB3+this.CTB4+this.CRB4;
     console.log(`Rb is ${this.Rb}`);
      //calcution for R1ins
      this.R1ins=this.CRC*this.CTS;
      console.log(`R1ins is ${this.R1ins}`);
       //calcution for R1ins
      this.R2ins=this.CTC*this.CRC;
      console.log(`R2ins is ${this.R2ins}`);
       //calcution for R1met
      this.R1met=this.CRS*this.Dsmall;
      console.log(`R1met is ${this.R1met}`);
       //calcution for R2met
      this.R2met=(this.CRS*this.CTS);
      console.log(`R2met is ${this.R2met}`);
        //calcution for R1
      this.R1=(this.w*this.R1ins*this.R1met)/((this.CTS*(this.R1ins-this.R1met))+(this.w*this.R1met));
      console.log(`R1 is ${this.R1}`);
        //calcution for R2
      this.R2=(this.w*this.R2ins*this.R2met)/(this.length*(this.R2ins-this.R2met)+(this.w*this.R2met));
      console.log(`R2 is ${this.R2}`);
       //calcution for Ercav
       this.Ercav=this.Ra+this.Rb+this.R1ins + (2*this.R2ins);
      console.log(`Ercav is ${this.Ercav}`);
        //calcution for Ercav
      this.Erw=this.Ra+this.Rb+this.R1 + (2*this.R2);
      console.log(`Erw is ${this.Erw}`);
      //calculation for dsmall
      
      //outputs
     this.rWithoutFilm= this.Ercav*this.Erw*this.spacing/(this.w*(this.Ercav-this.Erw)+(this.spacing*this.Erw))
    console.log(`rWithoutFilm is ${this.rWithoutFilm} `)

    this.rWithFilm= this.rWithoutFilm+0.68+0.17;
    this.UWithoutFilm=1/this.rWithoutFilm;
    this.UWithFilm=1/this.rWithFilm;
    // alert(`
    // dlarge= ${this.Dlarge}
    // spacing=${this.spacing}
    // CTA= ${this.CTC}
    // CRC= ${this.CRC}
    // length=${this.length}
    // stud thickness= ${ this.CTS}
    // `)
    this.check();
  }
  zone:number;
  area:number;
  //zone data
 zoneData:any=[
  {
    "Zone": "1",
    "NonRes": "0.124",
    "Res": "0.124",
    "Semiheated": "0.352",
    "": ""
  },
  {
    "Zone": "2",
    "NonRes": "0.084",
    "Res": "0.064",
    "Semiheated": "0.124",
    "": ""
  },
  {
    "Zone": "3",
    "NonRes": "0.077",
    "Res": "0.064",
    "Semiheated": "0.124",
    "": ""
  },
  {
    "Zone": "4",
    "NonRes": "0.064",
    "Res": "0.064",
    "Semiheated": "0.124",
    "": ""
  },
  {
    "Zone": "5",
    "NonRes": "0.055",
    "Res": "0.055",
    "Semiheated": "0.084",
    "": ""
  },
  {
    "Zone": "6",
    "NonRes": "0.049",
    "Res": "0.049",
    "Semiheated": "0.084",
    "": ""
  },
  {
    "Zone": "7",
    "NonRes": "0.049",
    "Res": "0.042",
    "Semiheated": "0.064",
    "": ""
  },
  {
    "Zone": "8",
    "NonRes": "0.037",
    "Res": "0.037",
    "Semiheated": "0.064",
    "": ""
  }
];
zoneChange(n){
  this.zone=n;
}
areaChange(n){
  this.area=n;
}
compliant:boolean;
   uVal:number;
  check(){
 
   
    for(let i=0;i<this.zoneData.length;i++){
        if(this.zoneData[i].Zone==this.zone){
          if(this.area==1){
              this.uVal=this.zoneData[i].NonRes;

          }
           if(this.area==2){
              this.uVal=this.zoneData[i].Res;
            
          }
          else{
            this.uVal=this.zoneData[i].Semiheated;
                
          }
        }
    }
     
    // alert(this.uVal)
  }
  ngOnInit() {
  
    this.calculate()
  }


}

