import { Injectable } from '@angular/core';
import { PostService } from 'dm-api';
@Injectable({
  providedIn: 'root'
})
export class ItemsDataService {
  itemSortBy:string = 'price-low';
  items:any[] = [];
  index:number = 0;
  page:number = 1;

  constructor(private post:PostService) { }
  
 
 
  async getPosts(pageNumber:number,pageSize:number){
    console.log("GETTING POSTS");
    //these all the sort types: 1- price_low 2- price_hight 3- date_new 4- date_old 5- kilometer_low 6- kilometer_hight 7- year_new 8- year_old
    return await this.post.getAllPosts(this.itemSortBy,'627925bfda535aadb15ef3d4',pageNumber,pageSize,"app",{});
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
