// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

export interface filter {
    _id: string,
    nameEn:string,
    nameAr: string,
    addVehicleOrder: number,
    filterOrder: number,
    types: [
        {
            _id: string,
            nameEn: string,
            nameAr: string
        }
    ]
  }