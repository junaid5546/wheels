/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import { identity } from '../Classes/Vehicle';
import { _name,filterType_c } from '../Interface/Name';
export class Filter extends identity {
  // BADGE/COUNTER OF FILTER
  private badge?: number
  // ADD-POST ORDER
  private addVehicleOrder!: number
  // FILTER ORDER
  private filterOrder!: number
  // ROUTER PATH FOR COMPONENT
  private path!: string
  // LIST OF FILTER ITEMS
  private types:filterType_c[];
  private selected:filterType_c[];
  /**
   * Instansiate the object of filter.
   * @param name:object name of the filter.
   * @param addVehicleOrder:number ADD-POST ORDER of filter.
   * @param filterOrder:number FILTER ORDER of filter.
   * @param _id:string mongoDB id of filter.
   * @param path:string ROUTE PATH of filter.
   * @param types:[FilterItem] LIST OF ITEMS of filter.
   */

  constructor (obj:any) {
    super();
    this.initiateObject(obj);
  }
// INITIATING THE OBJECT.
  private initiateObject(object:any){
    this._id = object._id;
    this.path = object.path;
    this.name = object.name;
    this.badge = 0;
    this.addVehicleOrder = object.addVehicleOrder;
    this.filterOrder = object.filterOrder;
    this.types = [];
    object.types.forEach(type=>{ 
      let obj = new filterType_c(type);
      this.types.push(obj);
    });
  }

  // IS FILTER ALREADY SELECTED.
  isCherries(filter) {
    return filter.id === 'cherries';
  }
  // ADD SELECTED FEATURE IN LIST
  public addSelectedFilterInList(filterType:filterType_c) {
    //this.selected.find(filter => filter. )

  }
  // IT RETURNS VIEW OF FILTER.
  public renderView () {
    if (
      this.path != 'Kmake' &&
      this.path != 'interior-color' &&
      this.path != 'exterior-color' &&
      this.path != 'Kbody' &&
      this.path != 'car-location'
    ) {
      return 'list'
    } else if (this.path === 'Kmake' || this.path === 'car-location') {
      return 'accordion'
    } else {
      return 'grid'
    }
  }
  // RETURNS THE COPY OF FILTER.
  public getFilterBluePrint () {
    let obj = {
      name: this.name,
      id: this._id,
      badge: this.badge,
      addOrder: this.addVehicleOrder,
      filterOrder: this.filterOrder,
      items: this.types
    }
    return obj
  }
  /**
   * 
   * @returns LIST OF filterType_s
   */
  public getTypes(){
    return this.types;
  }

  // UPDATE COUNTER FOR THE FILTER THAT HOW MANY ITEMS ARE SELECTED FOR PARTICULAR FILTER AND RETURNS THE COUNT.
  public updateBadge (count: number) {
    this.badge = count
    return this.badge
  }
}
