
import { Injectable } from '@angular/core';
import {RValue} from '../data/uvalue-data'
@Injectable()
export class RValueService{
    getData(){
        return RValue;
    }
}