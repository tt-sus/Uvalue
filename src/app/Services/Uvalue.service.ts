
import { Injectable } from '@angular/core';
import {lookUp} from '../data/uvalue-data'
@Injectable()
export class UValueService{
    getData(){
        return lookUp;
    }
}