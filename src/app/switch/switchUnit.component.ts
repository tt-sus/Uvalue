import {
    Component, Input, ElementRef, Output, EventEmitter, OnChanges, SimpleChange, ViewChild, Renderer, AfterViewInit,
    trigger,
    state,
    style,
    transition,
    animate,
    ViewEncapsulation
} from '@angular/core';

@Component({
   encapsulation: ViewEncapsulation.None,
  selector: 'switchU',
  templateUrl: './switchUnit.component.html',
  styles: [`
   .switchUnit{
   padding: 6px 25px !important;
}
  `],
   animations: [
        trigger('statusChange', [
            state('false', style({ transform: 'translateX(-57.333%)' })),
            state('true', style({ transform: 'translateX(73%)' })),
            transition('true <=> false', animate('200ms'))
        ])
    ]
})
export class SwitchUnitComponent {
   constructor(private el: ElementRef, private renderer: Renderer) {
        
    }

    @ViewChild('on') _onSpan:ElementRef;
    @ViewChild('off') _offSpan:ElementRef; 
    @ViewChild('mid') _midSpan:ElementRef;  
    @ViewChild('container') _container:ElementRef;  
    @ViewChild('main') _main:ElementRef;
      


    private _statusStr: string = "false";

    //styles properties
    private _onColor = "bootstrap-switch-info";
    private _offColor = "bootstrap-switch-default";
    private _minWidth = 20;
    private _sizeClass = "bootstrap-switch-normal";
    private _disabledClass = "";

    //public properties
    @Input() status: boolean = false; 
    @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() onText: string = " SI ";
    @Input() offText: string = "  IP  ";
    @Input() onColor = "bootstrap-switch-info";
    @Input() offColor = "bootstrap-switch-default";
    @Input() size = "mini";
    @Input() disabled:boolean = false;

   toggleStatus(): void {
     
        if(!this.disabled){
            this.status = !this.status;
            this._statusStr = this.status.toString();
            this.statusChange.emit(this.status);
        }
    }
}
