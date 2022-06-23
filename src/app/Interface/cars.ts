// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { VehicleService } from 'dm-api';
export class Car {
  // CAR SCHEMA

  private make: { make_id: number; name: string };
  private model: { model_id: number; name: string };
  private trim: { trim_id: number; name: string };
  private year_id: { year_id: number; name: string };
  private condition: { id: number; name: string };
  private body: { body_id: number; name: string };
  private interiorColor: { interior_color_id: number; name: string };
  private exteriorColor: { exterior_color_id: number; name: string };
  private doorCount: { door_count_id: number; name: number };
  private engineSize: { engine_size: number; name: number };
  private cylinderCount: { cylinder_count_id: number; name: number };
  private fuelType: { fuel_type_id: number; name: string };
  private transmissionType: { transmission_type_id: string; name: string };
  private drivetrain: { drivetrain_id: string; name: string };
  private seats: { seats_type_id: string; name: string };
  private origin: { origin_id: string; name: string };
  private governate: { governorate_id: string; name: string };
  private state: { state_id: string; name: string };
  private warrantyDuration: { warranty_duration_id: string; name: string };
  private warrentyKilometer: { warranty_kilometer: number; name: string };
  private insurance: { insurance_type_id: string; name: string };
  private readiness: { readiness_id: string; name: string };
  private saleType: { sale_type_id: string; name: string };
  private features: { features_id_array: string[]; featuresList: any[] };
  private price: string;
  private distance_kilometer: number;
  private distance_mile: number;
  private seller_notes: string;

  constructor() {}

  /**
   * TAKE ID AND NAME OF MAKE
   * @param _id string
   * @param _makeName string
   * @returns boolean
   */
  setMake(_id: string, _makeName: string) {
    
  }

  /**
   * TAKE ID AND NAME OF MODEL
   * @param _id string
   * @param _modelName string
   * @returns boolean
   */
  setModel(_id: string, _modelName: string) {}

  /**
   * TAKE ID AND NAME OF MAKE
   * @param _id string
   * @param _modelName string
   * @returns boolean
   */
  setTrim() {}

  /**
   * TAKES YEAR ID.
   * @param _id string
   */
  setYearId(_id: string) {}

  /**
   * SET CONDITION OF THE CAR
   * @param _id string
   * @param _name string
   */
  setCondition(_id: string, _name: string) {}

  /**
   * SET BODY OF THE CAR
   * @param _id string
   * @param _name string
   */
  setBody(_id: string, _name: string) {}

  /**
   * SET INTERIOR COLOR OF THE CAR
   * @param _id string
   * @param _name string
   */
  setInteriorColor(_id: string, _name: string) {}

  /**
   * SET EXTERIOR COLOR OF THE CAR
   * @param _id string
   * @param _name string
   */
  setExteriorColor(_id: string, _name: string) {}

  /**
   * SET DOOR COUNT OF THE CAR
   * @param _id string
   * @param _name string
   */
  setDoorCount(_id: string, _name: string) {}

  /**
   * SET ENGINE SIZE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setEngineSize(_id: string, _name: string) {}

  /**
   * SET CYLINDER COUNT OF THE CAR
   * @param _id string
   * @param _name string
   */
  setCylinderCount(_id: string, _name: string) {}

  /**
   * SET FUEL TYPE COUNT OF THE CAR
   * @param _id string
   * @param _name string
   */
  setFuelType(_id: string, _name: string) {}

  /**
   * SET TRANSMISSION TYPE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setTransmissionType(_id: string, _name: string) {}

  /**
   * SET DRIVETRAIN OF THE CAR
   * @param _id string
   * @param _name string
   */
  setdrivetrain(_id: string, _name: string) {}

  /**
   * SET SEATS OF THE CAR
   * @param _id string
   * @param _name string
   */
  setSeats(_id: string, _name: string) {}

  /**
   * SET ORIGIN OF THE CAR
   * @param _id string
   * @param _name string
   */
  setOrigins(_id: string, _name: string) {}

  /**
   * SET GOVERNATE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setGovernate(_id: string, _name: string) {}

  /**
   * SET STATE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setState(_id: string, _name: string) {}

  /**
   * SET WARRENTY DURATION OF THE CAR
   * @param _id string
   * @param _name string
   */
  setWarrantyDuration(_id: string, _name: string) {}

  /**
   * SET WARRENTY IN KILOMETERS OF THE CAR
   * @param _id string
   * @param _name string
   */
  setWarrentyKilometer(_id: string, _name: string) {}

  /**
   * SET INSURANCE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setInsurance(_id: string, _name: string) {}

  /**
   * SET READINESS OF THE CAR
   * @param _id string
   * @param _name string
   */
  setReadiness(_id: string, _name: string) {}

  /**
   * SET SALE TYPE OF THE CAR
   * @param _id string
   * @param _name string
   */
  setSaleType(_id: string, _name: string) {}

  /**
   * SET FEATURES OF THE CAR
   * @param _id string
   * @param _value string
   */
  setFeatures(_id: string[], _value: any[]) {}

  //price

  /**
   * SET PRICE OF THE CAR
   * @param _value string
   */
  setPrice(_value: string) {}

  /**
   * SET DISTANCE IN KM OF THE CAR
   * @param _value string
   */
  setDistanceKilometer(_value: string) {}

  /**
   * SET DISTANCE IN MILE OF THE CAR
   * @param _value string
   */
  setDistanceMile(_value: string) {}

  //seller_notes

  /**
   * SET SELLER NOTES IN MILE OF THE CAR
   * @param _value string
   */
  setSellerNotes(_value: string) {}
  
}
