export interface Car {
    // CAR SCHEMA

    companyId:number;
    make:{id:number,name:string};
    model:{id:number, name:string};
    trim:{id:number, name:string};
    year:number;
    condition:{id:number,status:string};
    body:{id:number, name:string};
    color:{id:number, colorCode:string};
    doorCount:{id:number, doors:number};
    engineSize:{id:number, size:number};
    cylinderCount:{id:number, size:number};
    fuelType:{id:number, type:string};
    transmissionType:string;
    drivetrain:string;
    interiorColor:string;
    seats:string;
    origin:string;
    governorate:string;
    state:string;
    warrentyDuration:string;
    warrentyDistance:string;
    insuranceType:string;
    drivingReadiness:string;
    saleType:string;
    features:string;
}