import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserDataService } from "../Services/user-data.service";

@Injectable({
    providedIn:'root'
})

export class AuthenticationGurad_dm implements CanActivate {
    constructor(private userData:UserDataService, private router:Router ) {}

    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.userData.isSignedIn()
    .then((status:any)=>{
        if(status){
            return true;
        } else {
        this.router.navigate(['register'])
        }
    });

        return this.userData.isSignedIn()    
    }
}