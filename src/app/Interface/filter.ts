
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'dm-apis';
export class Filter {
    private filters = new BehaviorSubject<any[]>([]);
    constructor() {
        this.filters.subscribe((res)=>{
            this.fetchResultFromFilterApi(res);
        })
    }
/**
 * ADDS NEW FILTER IN ARRAY
 * @param name 
 * @param value 
 */
    addFilter(name:string, value:string){
        let obj = {};
        obj[name] = value;
        this.filters.next((this.filters.getValue().concat([obj])));
    }
    /**
     * FETCH NEW DATA FROM API USING FILTERATION
     * @param filterArray
     */
    fetchResultFromFilterApi(filterArray:any[]){
        
    }
    
  } 