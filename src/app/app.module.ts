import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { UValueComponent } from './uvalue/uvalue.component';
import {ToolRoutes} from './app.routes'
import { UValueService } from './Services/Uvalue.service';
 import { ModalComponent } from './modal/modal.component';
import { SpacingModal } from './modal/spacing.modal';
import { Modal_BComponent } from './modal/modal_B.component';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';
import { SwitchValueComponent } from './switch/switch.component';
import { SwitchFilmComponent } from './switch/switchFilm.component';
import { SwitchUnitComponent } from './switch/switchUnit.component';
import { SharedComponent } from './shared/shared.component';
import { RValueService } from './Services/RValueService';
import { ReferencePopover } from './popovers/referencePop';

@NgModule({
  declarations: [
    AppComponent,
    UValueComponent,
     ModalComponent,
     SpacingModal,
     Modal_BComponent,
     SwitchComponent,
     SwitchValueComponent,
     SwitchFilmComponent,
     SwitchUnitComponent,
     SharedComponent,
     ReferencePopover
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ToolRoutes),
     NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [UValueService,NgbModal,RValueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
