import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss'],
})
export class InventoryItemComponent implements OnInit {
  images:any[] = [{name:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80'},
  {name:'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0ODkwNDc5fHxlbnwwfHx8fA%3D%3D&w=1000&q=80'}]
 
  @Input() items:any[] = [];

  constructor(private router:Router) { }

  ngOnInit() {
    console.log("ITEM :", this.items);
  }

  navigatePostDetails(item:any) {
    this.router.navigate(['tabs/tab1/post-details',{'item': JSON.stringify(item)}]);
  }

  onSwiper(swiper) {
    console.log(swiper);
  }

  onSlideChange(e) {
    console.log('slide change',e);
  }

}
