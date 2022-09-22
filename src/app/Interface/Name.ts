import { Filter } from "../Classes/Filter";
import { identity } from "../Classes/Vehicle";
/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
export interface _name {
    en:string;
    ar:string;
}

export class filterType_c extends identity {
    
    protected error?:_name;
    protected checked!:boolean;
    
    constructor(obj:any){
        super();
        this.instanciateTypes(obj);
    }
    // SELECTING THE CURRENT OBJECT.
   public checkMarkType() {
        this.checked = true;
    }
    // DE-SELECTING THE CURRENT OBJECT.
    public uncheckType(){
        this.checked = false;
    }
    // RETURN THE VALUE OF CHECKED FLAG WHICH IS BOOLEAN.
    public isChecked(){
        return this.checked;
    }

    public getName(){
        return this.name;
    }
   
    // INSTANCIATING THE TYPE OBJECT
    private instanciateTypes(object:any) {
        this._id = object._id;
        this.checked = false;
        this.name = object.name;
        this.error = object.error;
    }
}

export class FilterType_Exterior_Interior_color extends filterType_c {
    protected cssHex?:string;

    constructor(obj:any){
        super(obj);
        this.cssHex = obj.cssHex;
    }
}

export interface doorCount_s {
    name:number;
    _id:string;
    checked:boolean;
}

export interface body_s {
    doorCount:doorCount_s[];
    error:_name;
    filtersId:string[];
    image:string;
    maxPrice:number;
    minPrice:number;
    name:_name;
    _id:string;
    checked:boolean;
}

export interface featureList_i {
    _id:string;
    name:_name
}