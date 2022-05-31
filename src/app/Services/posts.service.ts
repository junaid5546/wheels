import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  post_url = 'vehicle-for-sale/post/filtered-posts';
  constructor(private api:ApiService) { 

  }

    /**
   * 
   * @param userObj 
   * 
   */
     getAllPosts(){
       // this need to be get request.
       let obj = {
        body:[],
        make:[],
        model:[],
        trim:[],
        price:{"min":0 , "max":1000000},
        condition:[],
        year:[],
        exterior_color:[],
        interior_color:[],
        door:[],
        cylinders:[],
        engine_size:[],
        fuel:[],
        transmission:[],
        drivetrain:[],
        seats:[],
        origin:[],
        governorate:[],
        state:[],
        plate:[],
        driving_readiness:[],
        sale_type:[],
        sort_type:"price_hight" 
       }
      const apiRoute: any = {};
      return new Promise((resolve, reject) => {
        apiRoute.apiroute = this.post_url  ;
        apiRoute.data = obj;
        this.api.post(apiRoute, 'h3')
            .then((data: any) => {
              if(data['code'] === 0){
              // SETTING USER OBJECT
                resolve(data);
              }
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}
