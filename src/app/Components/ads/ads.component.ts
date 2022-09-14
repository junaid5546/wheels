import { Component, OnInit } from '@angular/core';
import { PostService } from 'dm-api';
@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit {

  constructor(private postService:PostService) { }

  bodies:any[] = [];
  models:any[] = [];
  posts:any[] = [];
  status:string = 'active';
  data = {"car_bodies":[],"car_models":[]};
  ngOnInit() {
    //this.getPostedPosts('active',{});
  }

  // SEGMENT CHANGE OF CAR STATUS.
  segmentChanged(e){
    console.log(e.detail.value);
    this.status = e.detail.value;
    this.getPostedPosts(this.status,{});
  }

  // GETTING POSTS OF ALL ADS ACCORDING TO STATUS.
  getPostedPosts(_status:string,filter:object) {
    this.postService.getAdsPost(_status,filter)
    .then((posts:any)=>{

      this.posts = posts.posts;

      this.bodies = posts.car_bodies.map(x=>{
        let obj = {name:null,selected:false};
        obj.name = x;
        return obj
      });
  
      this.models = posts.car_models.map(x=>{
        let obj = {name:null,selected:false};
        obj.name = x;
        return obj
      });

    });

   

  }

  changeBody(data){
    this.data.car_bodies.push(data);
    console.log("DATA in body:", this.data);
    this.getPostedPosts(this.status,this.data);
  }

  changeModel(data){
    this.data.car_models.push(data);
    console.log("DATA in change model:", data);
    this.getPostedPosts(this.status,this.data);
  }

}
