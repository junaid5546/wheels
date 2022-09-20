import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/Services/user-data.service';
@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss'],
})
export class InventoryItemComponent implements OnInit {

 
  @Input() items:any[] = [];
  @Input() title:any;
  
  constructor(private router:Router, private userData:UserDataService) { }

  ngOnInit() {
    console.log("ITEM :", this.items);
  }

  navigatePostDetails(item:any) {
    this.router.navigate(['tabs/post-details',{'item': JSON.stringify(item)}]);
  }

  onSwiper(swiper) {
    console.log(swiper);
  }

  onSlideChange(e) {
    console.log('slide change',e);
  }

  checkSignUpStatus(){
    this.userData.isSignedIn()
    .then((status:any)=>{
      if(status){
      // DO ANYTHING
      } else {
       this.router.navigate(['register']);
      }
    })
  }

}
