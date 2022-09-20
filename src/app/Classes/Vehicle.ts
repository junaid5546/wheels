// Copyright 2022 Google LLC
/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

export class identity {
  protected _id!: string
  protected name!: _name
}
export class Make extends identity {
  private clicked?: boolean
  private completed?: boolean
  private show?: boolean
  private models: [Model]
  constructor () {
    super();
  } 
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