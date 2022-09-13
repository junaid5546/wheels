/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { identity } from '../Classes/Vehicle'
import { _name } from '../Interface/Name'

export class Filter {
  // FILTER ID
  private _id!: string
  // NAME OF FILTER
  private name!: _name
  // BADGE/COUNTER OF FILTER
  private badge?: number
  // ADD-POST ORDER
  private addVehicleOrder!: number
  // FILTER ORDER
  private filterOrder!: number
  // ROUTER PATH FOR COMPONENT
  private path!: string
  // LIST OF FILTER ITEMS
  private types!: [identity]

  /**
   * Instansiate the object of filter.
   * @param name:object name of the filter.
   * @param addVehicleOrder:number ADD-POST ORDER of filter.
   * @param filterOrder:number FILTER ORDER of filter.
   * @param _id:string mongoDB id of filter.
   * @param path:string ROUTE PATH of filter.
   * @param types:[FilterItem] LIST OF ITEMS of filter.
   */

  constructor (
    name: _name,
    addPostOrder: number,
    filterOrder: number,
    _id: string,
    path: string
  ) {
    this._id = _id
    this.path = path
    this.name = name
    this.badge = 0
    this.addVehicleOrder = addPostOrder
    this.filterOrder = filterOrder
  }

  // IT RETURNS VIEW OF FILTER
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
  // RETURNS THE COPY OF FILTER
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
  // UPDATE COUNTER FOR THE FILTER THAT HOW MANY ITEMS ARE SELECTED FOR PARTICULAR FILTER AND RETURNS THE COUNT.
  public updateBadge (count: number) {
    this.badge = count
    return this.badge
  }
}
