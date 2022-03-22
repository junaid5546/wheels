import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {

  items:any[] = [];
  index:number = 0;
  page:number = 1;

  constructor() { }
  
  // PAGINATION IN THE API, 0 AND 1 IS DEFAULT VALUE
  getCars = async (index, page) => {
   let carsApiResponse:any = await this.getItemsAPI(index,page);
   if(carsApiResponse.status == 200 && carsApiResponse.data.length != 0){
    this.items.concat(carsApiResponse.data);
   } else {
     // THROW ERROR
     // WHATER GET FROM SERVER
     // SHOW IN A DIALOG BOX
     // USING DIALOG SERVICE
   }
  }


  // GETTING ITEMS AND CONCATING WITH EXIXTING LIST OF ITEMS. 
  getItemsAPI(index,page){
    console.log("Index:", index, ' Page: ',page);
  }
  // ADDING ITEMS IN FAV USING ENTITY ID.
  favItem(entityId,favObj){
    console.log('EntityId:',entityId, " Obj:", favObj);
  }
  // SHARING ITEM USING ITS ID.
  shareItem(entityId,shareObj) {
    console.log('EntityId:',entityId, " Obj:", shareObj);
  }
  // REGISTRING NOTIFICATION AGAINST CHANGE IN CURRENT ITEMS OR MODIFICATION.
  notifyItem(entityId,notifyObj) {
    console.log('EntityId:',entityId, " Obj:", notifyObj);
  }
  // ADDING NOTES AGAINST ITEM USING ENTITY ID.
  addNotes(entityId,notesObj) {
    console.log('EntityId:',entityId, " Obj:", notesObj);
  }
  // REPORTING ITEM USING ENTITY ID.
  reportItem(entityId,report){
    console.log('EntityId:',entityId, " Obj:", report);
  }
  // WHATSAPP URL FOR CURRENT ITEM USING ENITY ID.
  whatsAppItem(entityId,whatsappObj){
    console.log('EntityId:',entityId, " Obj:", whatsappObj);
  }
  // CHAT WITH ITEM'S OWNER USING OWNER ID & ENTITY ID.
  chatWithItemOwner(entityId,ownerId){
    console.log('EntityId:',entityId, " Obj:", ownerId);
  }
}
