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