// Copyright 2022 Google LLC
/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import {FilterItem} from '../Classes/Vehicle';
export interface _name {
    en:string;
    ar:string;
}
export class Filter {
    // FILTER ID
    _id:string;
    // NAME OF FILTER
    name:_name
    // BADGE/COUNTER OF FILTER
    badge?:number
    // ADD-POST ORDER
    addVehicleOrder:number
    // FILTER ORDER
    filterOrder:number
    // ROUTER PATH FOR COMPONENT
    path:string
    // WHICH VIEW IT SHOULD BE PRESENTED GRID OR LIST
    view:string;
    // LIST OF FILTER ITEMS
    types?:[FilterItem];

    /**
     * Instansiate the object of filter.
     * @param name:object name of the filter.
     * @param badge:number badge of filter.
     * @param view:string presentation of filter.
     * @param addVehicleOrder:number ADD-POST ORDER of filter.
     * @param filterOrder:number FILTER ORDER of filter.
     * @param _id:string mongoDB id of filter.
     * @param path:string ROUTE PATH of filter.
     * @param types:[FilterItem] LIST OF ITEMS of filter.
     */

    constructor(name:_name,badge:number,view:string,addPostOrder:number,filterOrder:number,_id:string,path:string) {
        this._id;
        this.path = path;
        this.name = name;
        this.badge = badge;
        this.view = view;
        this.addVehicleOrder = addPostOrder;
        this.filterOrder = filterOrder;
    }
}

