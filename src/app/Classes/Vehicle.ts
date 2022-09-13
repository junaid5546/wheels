// Copyright 2022 Google LLC
/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import {_name} from '../Interface/car-filter';

export interface Model {
    _id:string;
    name:_name;
    trims:[Trim];
}

export interface DoorCount {
    _id:string;
    name:_name;
}

export interface Engine {
    _id:string;
    name:_name;
}

export interface Bodies {
    _id:string;
    name:_name;
    maxPrice: number;
    minPrice: number;
    image: string;
    filtersId:[string];
    doorCount:[DoorCount];
    error:string;
}

export interface Trim {
    _id:string;
    name:_name;
    bodies: [Bodies]
    engineSize: [Engine]
}
export class FilterItem {
    _id!:string;
    name!:_name;
}

export class Make extends FilterItem {
    clicked?:boolean = false;
    completed?:boolean = false;
    models:[Model];

    constructor(){
        super();
    }
}